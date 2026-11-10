<?php

namespace App\Http\Controllers\Stock;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Color;
use App\Models\Material;
use App\Models\Product;
use App\Models\Size;
use App\Models\SubCategory;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class VariantController extends Controller
{
    private const EXPORT_COLUMNS = [
        'id' => 'ID',
        'article_no' => 'Article No',
        'default_name' => 'Name',
        'category_name' => 'Category',
        'sub_category_name' => 'Subcategory',
        'material_name' => 'Material',
        'variations' => 'Variations (Color / Size)',
        'status' => 'Status',
        'created_at' => 'Created At',
    ];

    public function index(Request $request)
    {
        $filters = $this->validatedFilters($request);

        return Inertia::render('WebPanel/Stock/Variant/Index', [
            'filters' => $filters,
            'filterOptions' => Inertia::defer(fn () => [
                'categories' => Category::where('status', 'active')->orderBy('name')->get(['id', 'name']),
                'subCategories' => SubCategory::where('status', 'active')->orderBy('name')->get(['id', 'category_id', 'name']),
                'materials' => Material::where('status', true)->orderBy('material_name')->get(['id', 'material_name']),
                'colors' => Color::where('status', 'active')->orderBy('name')->get(['id', 'name']),
                'sizes' => Size::where('status', 'active')->orderBy('name')->get(['id', 'name']),
            ]),
            'variants' => Inertia::defer(fn () => $this->paginatedVariants($filters)),
        ]);
    }

    public function export(Request $request): StreamedResponse
    {
        $filters = $this->validatedFilters($request);
        $columns = $this->validatedExportColumns($request);
        $variants = $this->decorateVariants($this->filteredVariantQuery($filters)->latest('variants.created_at')->get());
        $filename = 'variants-'.now()->format('Y-m-d').'.csv';

        return response()->streamDownload(function () use ($variants, $columns) {
            $output = fopen('php://output', 'w');
            fwrite($output, "\xEF\xBB\xBF");
            fputcsv($output, array_map(fn (string $column) => self::EXPORT_COLUMNS[$column], $columns));

            foreach ($variants as $variant) {
                fputcsv($output, array_map(fn (string $column) => $this->exportValue($variant, $column), $columns));
            }

            fclose($output);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    public function print(Request $request)
    {
        $filters = $this->validatedFilters($request);
        $columns = $this->validatedExportColumns($request);
        $variants = $this->decorateVariants($this->filteredVariantQuery($filters)->latest('variants.created_at')->get());
        $rows = $variants->map(fn ($variant) => array_map(
            fn (string $column) => $this->exportValue($variant, $column),
            $columns
        ))->all();

        return Inertia::render('WebPanel/Stock/Variant/Print', [
            'columns' => array_map(fn (string $column) => self::EXPORT_COLUMNS[$column], $columns),
            'rows' => $rows,
        ]);
    }

    private function validatedFilters(Request $request): array
    {
        return $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'sub_category_id' => ['nullable', 'integer', 'exists:sub_categories,id'],
            'material_id' => ['nullable', 'integer', 'exists:materials,id'],
            'color_id' => ['nullable', 'integer', 'exists:colors,id'],
            'size_id' => ['nullable', 'integer', 'exists:sizes,id'],
            'status' => ['nullable', Rule::in(['active', 'inactive'])],
        ]);
    }

    private function validatedExportColumns(Request $request): array
    {
        $validated = $request->validate([
            'columns' => ['nullable', 'array'],
            'columns.*' => ['required', 'string', Rule::in(array_keys(self::EXPORT_COLUMNS))],
        ]);

        $columns = array_values(array_unique($validated['columns'] ?? array_keys(self::EXPORT_COLUMNS)));

        return $columns ?: array_keys(self::EXPORT_COLUMNS);
    }

    private function filteredVariantQuery(array $filters)
    {
        return Variant::query()
            ->select([
                'variants.id',
                'variants.article_no',
                'variants.default_name',
                'variants.color_ids',
                'variants.size_ids',
                'variants.status',
                'variants.created_at',
                'categories.name as category_name',
                'sub_categories.name as sub_category_name',
                'materials.material_name as material_name',
            ])
            ->join('categories', 'variants.category_id', '=', 'categories.id')
            ->join('sub_categories', 'variants.sub_category_id', '=', 'sub_categories.id')
            ->join('materials', 'variants.material_id', '=', 'materials.id')
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('variants.article_no', 'like', "%{$search}%")
                        ->orWhere('variants.default_name', 'like', "%{$search}%")
                        ->orWhere('categories.name', 'like', "%{$search}%")
                        ->orWhere('sub_categories.name', 'like', "%{$search}%")
                        ->orWhere('materials.material_name', 'like', "%{$search}%");
                });
            })
            ->when($filters['category_id'] ?? null, fn ($query, $id) => $query->where('variants.category_id', $id))
            ->when($filters['sub_category_id'] ?? null, fn ($query, $id) => $query->where('variants.sub_category_id', $id))
            ->when($filters['material_id'] ?? null, fn ($query, $id) => $query->where('variants.material_id', $id))
            ->when($filters['color_id'] ?? null, fn ($query, $id) => $query->whereJsonContains('variants.color_ids', (int) $id))
            ->when($filters['size_id'] ?? null, fn ($query, $id) => $query->whereJsonContains('variants.size_ids', (int) $id))
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('variants.status', $status));
    }

    private function paginatedVariants(array $filters)
    {
        $paginated = $this->filteredVariantQuery($filters)
            ->latest('variants.created_at')
            ->paginate(10)
            ->withQueryString();

        $paginated->setCollection($this->decorateVariants($paginated->getCollection()));

        return $paginated;
    }

    private function decorateVariants(Collection $variants): Collection
    {
        $colorIds = $variants->flatMap(fn ($variant) => is_array($variant->color_ids) ? $variant->color_ids : [])->filter()->unique();
        $sizeIds = $variants->flatMap(fn ($variant) => is_array($variant->size_ids) ? $variant->size_ids : [])->filter()->unique();
        $colorMap = Color::whereIn('id', $colorIds)->pluck('name', 'id');
        $sizeMap = Size::whereIn('id', $sizeIds)->pluck('name', 'id');

        return $variants->map(function ($variant) use ($colorMap, $sizeMap) {
            $colorValues = is_array($variant->color_ids) ? $variant->color_ids : [];
            $sizeValues = is_array($variant->size_ids) ? $variant->size_ids : [];
            $pairCount = max(count($colorValues), count($sizeValues));
            $pairs = [];

            for ($index = 0; $index < $pairCount; $index++) {
                $colorId = $colorValues[$index] ?? null;
                $sizeId = $sizeValues[$index] ?? null;
                $pairs[] = [
                    'index' => $index,
                    'color_id' => $colorId,
                    'color_name' => $colorId ? ($colorMap[$colorId] ?? null) : null,
                    'size_id' => $sizeId,
                    'size_name' => $sizeId ? ($sizeMap[$sizeId] ?? null) : null,
                ];
            }

            $variant->attribute_pairs = $pairs;
            $variant->color_name = collect($pairs)->pluck('color_name')->filter()->unique()->implode(', ');
            $variant->size_name = collect($pairs)->pluck('size_name')->filter()->unique()->implode(', ');

            return $variant;
        });
    }

    private function exportValue(Variant $variant, string $column): string|int
    {
        if ($column === 'variations') {
            return collect($variant->attribute_pairs)
                ->map(fn (array $pair) => ($pair['color_name'] ?? '—').' / '.($pair['size_name'] ?? '—'))
                ->implode('; ');
        }

        $value = $column === 'created_at'
            ? $variant->created_at?->format('Y-m-d H:i:s')
            : $variant->{$column};

        return (string) ($value ?? '');
    }

    public function create()
    {
        return Inertia::render('WebPanel/Stock/Variant/Create', $this->formOptions());
    }

    public function bulkEdit()
    {
        return Inertia::render('WebPanel/Stock/Variant/BulkEdit', array_merge(
            $this->formOptions(),
            [
                'variants' => Inertia::defer(fn () => Variant::query()
                    ->orderBy('article_no')
                    ->get(['id', 'article_no', 'default_name'])),
            ]
        ));
    }

    public function bulkUpdate(Request $request)
    {
        $validated = $request->validate([
            'variant_ids' => ['required', 'array', 'min:1', 'max:100'],
            'variant_ids.*' => ['required', 'integer', 'distinct', 'exists:variants,id'],
            'update_category' => ['required', 'boolean'],
            'category_id' => [$request->boolean('update_category') ? 'required' : 'nullable', 'integer', 'exists:categories,id'],
            'sub_category_id' => [
                $request->boolean('update_category') ? 'required' : 'nullable',
                'integer',
                Rule::exists('sub_categories', 'id')->where(fn ($query) => $query->where('category_id', $request->input('category_id'))),
            ],
            'update_material' => ['required', 'boolean'],
            'material_id' => [$request->boolean('update_material') ? 'required' : 'nullable', 'integer', 'exists:materials,id'],
            'update_variations' => ['required', 'boolean'],
            'attributes' => [$request->boolean('update_variations') ? 'required' : 'nullable', 'array', 'min:1'],
            'attributes.*.color_id' => [$request->boolean('update_variations') ? 'required' : 'nullable', 'integer', 'exists:colors,id'],
            'attributes.*.size_ids' => [$request->boolean('update_variations') ? 'required' : 'nullable', 'array', 'min:1'],
            'attributes.*.size_ids.*' => [$request->boolean('update_variations') ? 'required' : 'nullable', 'integer', 'exists:sizes,id'],
        ]);

        if (! $request->boolean('update_category')
            && ! $request->boolean('update_material')
            && ! $request->boolean('update_variations')) {
            return back()->withErrors([
                'updates' => 'Choose at least one field group to update.',
            ]);
        }

        $updates = [];

        if ($request->boolean('update_category')) {
            $updates['category_id'] = $validated['category_id'];
            $updates['sub_category_id'] = $validated['sub_category_id'];
        }

        if ($request->boolean('update_material')) {
            $updates['material_id'] = $validated['material_id'];
        }

        if ($request->boolean('update_variations')) {
            [$updates['color_ids'], $updates['size_ids']] = $this->extractColorAndSizeArrays($validated['attributes']);
        }

        try {
            DB::transaction(function () use ($validated, $updates) {
                Variant::query()
                    ->whereIn('id', $validated['variant_ids'])
                    ->get()
                    ->each(fn (Variant $variant) => $variant->update($updates));
            });
        } catch (\Throwable $exception) {
            Log::error('Failed to bulk update variants.', ['exception' => $exception]);

            return back()->withInput()->withErrors([
                'error' => 'The selected variants could not be updated. Please try again.',
            ]);
        }

        return redirect()->route('admin.stock.variant.index')
            ->with('success', count($validated['variant_ids']).' variants updated successfully.');
    }

    public function store(Request $request)
    {
        $validated = $request->validate($this->rules($request));

        try {
            DB::beginTransaction();

            [$colorIds, $sizeIds] = $this->extractColorAndSizeArrays($validated['attributes']);

            Variant::create([
                'article_no' => $validated['article_no'],
                'default_name' => $validated['default_name'],
                'category_id' => $validated['category_id'],
                'sub_category_id' => $validated['sub_category_id'],
                'material_id' => $validated['material_id'],
                'status' => $validated['status'],
                'color_ids' => $colorIds,
                'size_ids' => $sizeIds,
            ]);

            DB::commit();

            return redirect()->route('admin.stock.variant.index')
                ->with('success', 'Variant saved successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to create variant: '.$e->getMessage());

            return back()->withInput()->withErrors([
                'error' => 'An error occurred while saving. Please try again.',
            ]);
        }
    }

    public function edit(Variant $variant)
    {
        return Inertia::render('WebPanel/Stock/Variant/Edit', array_merge(
            [
                // Deferred to match <Deferred data={['variant', ...]} /> in Edit.jsx
                'variant' => Inertia::defer(function () use ($variant) {
                    $colorIds = is_array($variant->color_ids) ? $variant->color_ids : [];
                    $sizeIds = is_array($variant->size_ids) ? $variant->size_ids : [];
                    $max = max(count($colorIds), count($sizeIds));

                    $groups = [];
                    for ($i = 0; $i < $max; $i++) {
                        $colorId = $colorIds[$i] ?? null;
                        $sizeId = $sizeIds[$i] ?? null;

                        if (! $colorId || ! $sizeId) {
                            continue;
                        }

                        $colorKey = (string) $colorId;
                        $groups[$colorKey] ??= ['color_id' => $colorId, 'size_ids' => []];

                        if (! in_array($sizeId, $groups[$colorKey]['size_ids'], true)) {
                            $groups[$colorKey]['size_ids'][] = $sizeId;
                        }
                    }

                    if ($groups === []) {
                        $groups[] = ['color_id' => '', 'size_ids' => []];
                    }

                    return [
                        'id' => $variant->id,
                        'article_no' => $variant->article_no,
                        'default_name' => $variant->default_name,
                        'category_id' => $variant->category_id,
                        'sub_category_id' => $variant->sub_category_id,
                        'material_id' => $variant->material_id,
                        'status' => $variant->status,
                        'attributes' => array_values($groups),
                    ];
                }),
            ],
            $this->formOptions()
        ));
    }

    public function update(Request $request, Variant $variant)
    {
        $validated = $request->validate($this->rules($request));

        try {
            DB::beginTransaction();

            [$colorIds, $sizeIds] = $this->extractColorAndSizeArrays($validated['attributes']);

            $variant->update([
                'article_no' => $validated['article_no'],
                'default_name' => $validated['default_name'],
                'category_id' => $validated['category_id'],
                'sub_category_id' => $validated['sub_category_id'],
                'material_id' => $validated['material_id'],
                'status' => $validated['status'],
                'color_ids' => $colorIds,
                'size_ids' => $sizeIds,
            ]);

            DB::commit();

            return redirect()->route('admin.stock.variant.index')
                ->with('success', 'Variant updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to update variant: '.$e->getMessage());

            return back()->withInput()->withErrors([
                'error' => 'An error occurred while updating. Please try again.',
            ]);
        }
    }

    /**
     * Optional endpoint: Delete a specific color_id, size_id, or row index directly by ID.
     */
    public function removeVariationItem(Request $request, Variant $variant)
    {
        $data = $request->validate([
            'index' => 'nullable|integer|min:0',
            'color_id' => 'nullable|integer',
            'size_id' => 'nullable|integer',
        ]);

        $colorIds = is_array($variant->color_ids) ? $variant->color_ids : [];
        $sizeIds = is_array($variant->size_ids) ? $variant->size_ids : [];

        if (isset($data['index'])) {
            // Remove the paired row at this index
            unset($colorIds[$data['index']], $sizeIds[$data['index']]);
        } else {
            // Or remove by specific color_id / size_id value
            if (! empty($data['color_id'])) {
                $colorIds = array_filter($colorIds, fn ($id) => (int) $id !== (int) $data['color_id']);
            }
            if (! empty($data['size_id'])) {
                $sizeIds = array_filter($sizeIds, fn ($id) => (int) $id !== (int) $data['size_id']);
            }
        }

        $variant->update([
            'color_ids' => array_values($colorIds),
            'size_ids' => array_values($sizeIds),
        ]);

        return back()->with('success', 'Variation attribute removed successfully.');
    }

    public function destroy(Variant $variant)
    {
        try {
            $product = Product::with('variations')
                ->where('variant_id', $variant->id)
                ->first();
            $imagePaths = collect([$product?->image])
                ->merge($product?->variations->pluck('image') ?? [])
                ->filter()
                ->unique()
                ->values()
                ->all();

            DB::transaction(fn () => $variant->delete());

            if ($imagePaths !== []) {
                Storage::disk('public')->delete($imagePaths);
            }

            return back()->with('success', 'Variant deleted successfully.');
        } catch (\Throwable $exception) {
            Log::error('Failed to delete variant.', ['exception' => $exception]);

            return back()->withErrors(['error' => 'Failed to delete variant.']);
        }
    }

    /**
     * Converts the attributes array from the React form into parallel color_ids and size_ids arrays.
     */
    private function extractColorAndSizeArrays(array $attributes): array
    {
        $colorIds = [];
        $sizeIds = [];
        $seenPairs = [];

        foreach ($attributes as $attribute) {
            $colorId = (int) $attribute['color_id'];

            foreach ($attribute['size_ids'] as $sizeId) {
                $sizeId = (int) $sizeId;
                $pairKey = $colorId.'-'.$sizeId;

                if (isset($seenPairs[$pairKey])) {
                    continue;
                }

                $seenPairs[$pairKey] = true;
                $colorIds[] = $colorId;
                $sizeIds[] = $sizeId;
            }
        }

        return [$colorIds, $sizeIds];
    }

    private function rules(Request $request): array
    {
        return [
            'article_no' => ['required', 'string', 'max:255'],
            'default_name' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'sub_category_id' => [
                'required',
                'integer',
                Rule::exists('sub_categories', 'id')->where(function ($query) use ($request) {
                    $query->where('category_id', $request->input('category_id'));
                }),
            ],
            'material_id' => ['required', 'integer', 'exists:materials,id'],
            'status' => ['required', Rule::in(['active', 'inactive'])],
            'attributes' => ['required', 'array', 'min:1'],
            'attributes.*.color_id' => ['required', 'integer', 'exists:colors,id'],
            'attributes.*.size_ids' => ['required', 'array', 'min:1'],
            'attributes.*.size_ids.*' => ['required', 'integer', 'exists:sizes,id'],
        ];
    }

    private function formOptions(): array
    {
        return [
            'categories' => Inertia::defer(fn () => Category::where('status', 'active')
                ->select('id', 'name')->get()),
            'subCategories' => Inertia::defer(fn () => SubCategory::where('status', 'active')
                ->select('id', 'category_id', 'name')->get()),
            'colors' => Inertia::defer(fn () => Color::where('status', 'active')
                ->select('id', 'name')->get()),
            'sizes' => Inertia::defer(fn () => Size::where('status', 'active')
                ->select('id', 'name')->get()),
            'materials' => Inertia::defer(fn () => Material::where('status', true)
                ->select('id', 'material_name')->get()),
        ];
    }
}
