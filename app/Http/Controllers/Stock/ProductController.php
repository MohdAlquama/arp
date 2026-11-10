<?php

namespace App\Http\Controllers\Stock;

use App\Http\Controllers\Controller;
use App\Models\Color;
use App\Models\Product;
use App\Models\ProductVariation;
use App\Models\Size;
use App\Models\Variant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Throwable;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->input('search', ''));
        $promotional = $request->input('promotional', '');
        $published = $request->input('published', '');

        return Inertia::render('WebPanel/Product/Index', [
            'products' => Inertia::defer(function () use ($search, $promotional, $published) {
                return Product::query()
                    ->select([
                        'products.*',
                        'variants.article_no',
                        'variants.default_name',
                        'categories.name as category_name',
                        'sub_categories.name as sub_category_name',
                    ])
                    ->join('variants', 'products.variant_id', '=', 'variants.id')
                    ->join('categories', 'variants.category_id', '=', 'categories.id')
                    ->join('sub_categories', 'variants.sub_category_id', '=', 'sub_categories.id')
                    ->withCount('variations')
                    ->when($search !== '', function ($q) use ($search) {
                        $q->where(function ($q) use ($search) {
                            $q->where('variants.article_no', 'like', "%{$search}%")
                                ->orWhere('variants.default_name', 'like', "%{$search}%");
                        });
                    })
                    ->when($promotional !== '', fn ($q) => $q->where('products.is_promotional', (bool) $promotional))
                    ->when($published !== '', fn ($q) => $q->where('products.is_published', (bool) $published))
                    ->latest('products.created_at')
                    ->paginate(10)
                    ->withQueryString();
            }),
            'filters' => [
                'search' => $search,
                'promotional' => (string) $promotional,
                'published' => (string) $published,
            ],
        ]);
    }

    /* ------------------------------------------------------------------
     |  CREATE
     * ------------------------------------------------------------------ */
    public function create()
    {
        // Only active variants that don't already have a product
        return Inertia::render('WebPanel/Product/Create', [
            'variants' => Inertia::defer(fn () => $this->withAttributePairs(
                $this->variantQuery()
                    ->where('variants.status', 'active')
                    ->whereNotIn('variants.id', Product::query()->select('variant_id'))
                    ->latest('variants.created_at')
                    ->get()
            )),
        ]);
    }

    /* ------------------------------------------------------------------
     |  STORE
     * ------------------------------------------------------------------ */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'variant_id' => ['required', 'integer', 'exists:variants,id', 'unique:products,variant_id'],
            ...$this->sharedRules(),
        ], [
            'variant_id.unique' => 'A product already exists for this article.',
        ]);

        try {
            $variant = Variant::findOrFail($request->input('variant_id'));
            $pairs = $this->pairIds($variant);

            DB::transaction(function () use ($request, $variant, $pairs) {
                $product = Product::create([
                    'variant_id' => $variant->id,
                    'mrp' => $request->input('mrp'),
                    'image' => $request->file('product_image')?->store('products', 'public'),
                    'display_name' => $request->input('display_name'),
                    'color_display' => $request->input('color_display'),
                    'is_promotional' => $request->boolean('is_promotional'),
                    'is_published' => $request->boolean('is_published'),
                    'is_variant_table_visible' => $request->boolean('is_variant_table_visible'),
                    'description' => $request->input('description'),
                    'is_description_visible' => $request->boolean('is_description_visible'),
                ]);

                $this->syncVariations($product, $pairs, $request);
            });
        } catch (Throwable $exception) {
            return $this->operationFailed('create product', $exception);
        }

        return redirect()
            ->route('admin.stock.product.index')
            ->with('success', 'Product created successfully.');
    }

    /* ------------------------------------------------------------------
     |  EDIT
     * ------------------------------------------------------------------ */
    public function edit(Product $product)
    {
        return Inertia::render('WebPanel/Product/Edit', [
            'form' => Inertia::defer(fn () => $this->editFormData($product)),
        ]);
    }

    private function editFormData(Product $product): array
    {
        $product->load('variations');

        $variants = $this->withAttributePairs(
            $this->variantQuery()->where('variants.id', $product->variant_id)->get()
        );

        $variant = $variants->first();
        abort_if(! $variant, 404);

        // Build variations in the same order as the variant's colour/size pairs,
        // so the index the form sends back always matches.
        $existing = $product->variations->all();
        $imageAssignedForColor = [];

        $variations = collect($variant->attribute_pairs)->map(function ($pair) use (&$existing, &$imageAssignedForColor) {
            $match = null;

            foreach ($existing as $key => $row) {
                if ((int) $row->color_id === (int) $pair['color_id']
                    && (int) $row->size_id === (int) $pair['size_id']) {
                    $match = $row;
                    unset($existing[$key]);
                    break;
                }
            }

            $colorKey = (string) $pair['color_id'];
            $imageUrl = isset($imageAssignedForColor[$colorKey]) ? null : $match?->image_url;

            if ($imageUrl) {
                $imageAssignedForColor[$colorKey] = true;
            }

            return [
                'color_id' => $pair['color_id'],
                'color_name' => $pair['color_name'],
                'color_hex' => $pair['color_hex'],
                'size_id' => $pair['size_id'],
                'size_name' => $pair['size_name'],
                'image_url' => $imageUrl,
            ];
        })->values();

        return [
            'variants' => $variants,
            'product' => [
                'id' => $product->id,
                'variant_id' => $product->variant_id,
                'mrp' => $product->mrp,
                'article_no' => $variant->article_no,
                'default_name' => $variant->default_name,
                'category_name' => $variant->category_name,
                'sub_category_name' => $variant->sub_category_name,
                'material_name' => $variant->material_name,
                'image_url' => $product->image_url,
                'display_name' => $product->display_name,
                'color_display' => $product->color_display,
                'is_promotional' => $product->is_promotional,
                'is_published' => $product->is_published,
                'is_variant_table_visible' => $product->is_variant_table_visible,
                'description' => $product->description,
                'is_description_visible' => $product->is_description_visible,
                'variations' => $variations,
            ],
        ];
    }

    /* ------------------------------------------------------------------
     |  UPDATE
     * ------------------------------------------------------------------ */
    public function update(Request $request, Product $product): RedirectResponse
    {
        $request->validate($this->sharedRules());

        try {
            $pairs = $this->pairIds($product->variant);

            DB::transaction(function () use ($request, $product, $pairs) {
                $imagePath = $product->image;

                if ($request->hasFile('product_image')) {
                    $this->deleteFile($imagePath);
                    $imagePath = $request->file('product_image')->store('products', 'public');
                } elseif ($request->boolean('remove_product_image')) {
                    $this->deleteFile($imagePath);
                    $imagePath = null;
                }

                $product->update([
                    'image' => $imagePath,
                    'mrp' => $request->input('mrp'),
                    'display_name' => $request->input('display_name'),
                    'color_display' => $request->input('color_display'),
                    'is_promotional' => $request->boolean('is_promotional'),
                    'is_published' => $request->boolean('is_published'),
                    'is_variant_table_visible' => $request->boolean('is_variant_table_visible'),
                    'description' => $request->input('description'),
                    'is_description_visible' => $request->boolean('is_description_visible'),
                ]);

                $this->syncVariations($product, $pairs, $request);
            });
        } catch (Throwable $exception) {
            return $this->operationFailed('update product', $exception);
        }

        return redirect()
            ->route('admin.stock.product.index')
            ->with('success', 'Product updated successfully.');
    }

    /* ------------------------------------------------------------------
     |  QUICK TOGGLE (promotional / published) from the list page
     * ------------------------------------------------------------------ */
    public function toggle(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate([
            'field' => ['required', Rule::in(['is_promotional', 'is_published'])],
        ]);

        $field = $data['field'];

        try {
            $product->update([$field => ! $product->{$field}]);
        } catch (Throwable $exception) {
            return $this->operationFailed('toggle product status', $exception);
        }

        return back()->with('success', 'Product updated.');
    }

    /* ------------------------------------------------------------------
     |  DELETE
     * ------------------------------------------------------------------ */
    public function destroy(Product $product): RedirectResponse
    {
        try {
            DB::transaction(function () use ($product) {
                $this->deleteFile($product->image);

                foreach ($product->variations as $variation) {
                    $this->deleteFile($variation->image);
                }

                $product->delete(); // variations are removed by the FK cascade
            });
        } catch (Throwable $exception) {
            return $this->operationFailed('delete product', $exception);
        }

        return redirect()
            ->route('admin.stock.product.index')
            ->with('success', 'Product deleted.');
    }

    /* ==================================================================
     |  HELPERS
     * ================================================================== */

    private function sharedRules(): array
    {
        return [
            'mrp' => ['nullable', 'numeric', 'min:0', 'max:99999999.99'],
            'display_name' => ['required', 'string', 'max:255'],
            'color_display' => ['required', Rule::in(['swatch', 'name', 'both'])],
            'product_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'remove_product_image' => ['nullable', 'boolean'],
            'is_promotional' => ['boolean'],
            'is_published' => ['boolean'],
            'is_variant_table_visible' => ['required', 'boolean'],
            'description' => ['nullable', 'string', 'max:5000'],
            'is_description_visible' => ['required', 'boolean'],
            'variations' => ['nullable', 'array'],
            'variations.*.image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'variations.*.remove_image' => ['nullable', 'boolean'],
        ];
    }

    /** Base variant query with the joined display names. */
    private function variantQuery()
    {
        return Variant::query()
            ->select([
                'variants.id',
                'variants.article_no',
                'variants.default_name',
                'variants.color_ids',
                'variants.size_ids',
                'categories.name as category_name',
                'sub_categories.name as sub_category_name',
                'materials.material_name',
            ])
            ->join('categories', 'variants.category_id', '=', 'categories.id')
            ->join('sub_categories', 'variants.sub_category_id', '=', 'sub_categories.id')
            ->join('materials', 'variants.material_id', '=', 'materials.id');
    }

    /** color_ids / size_ids may be an array (cast) or a raw JSON string. */
    private function decodeIds($value): array
    {
        if (is_string($value)) {
            $value = json_decode($value, true);
        }

        return is_array($value) ? array_values($value) : [];
    }

    /** [[color_id, size_id], ...] paired by index. */
    private function pairIds(Variant $variant): array
    {
        $colorIds = $this->decodeIds($variant->color_ids);
        $sizeIds = $this->decodeIds($variant->size_ids);
        $max = max(count($colorIds), count($sizeIds));

        $pairs = [];
        for ($i = 0; $i < $max; $i++) {
            $pairs[] = [$colorIds[$i] ?? null, $sizeIds[$i] ?? null];
        }

        return $pairs;
    }

    /** Hex code from whichever column your colors table uses. */
    private function colorHex(?Color $color): ?string
    {
        if (! $color) {
            return null;
        }

        $hex = $color->hex_code ?? $color->hex ?? $color->color_code ?? $color->code ?? null;

        if (! $hex) {
            return null;
        }

        $hex = trim((string) $hex);

        return str_starts_with($hex, '#') ? $hex : '#'.$hex;
    }

    /** Adds `attribute_pairs` (colour name + hex, size name) to each variant. */
    private function withAttributePairs(Collection $variants): Collection
    {
        $colorIds = $variants->flatMap(fn ($v) => $this->decodeIds($v->color_ids))->filter()->unique()->values();
        $sizeIds = $variants->flatMap(fn ($v) => $this->decodeIds($v->size_ids))->filter()->unique()->values();

        $colors = Color::whereIn('id', $colorIds)->get()->keyBy('id');
        $sizes = Size::whereIn('id', $sizeIds)->pluck('name', 'id');

        return $variants->map(function ($variant) use ($colors, $sizes) {
            $pairs = [];

            foreach ($this->pairIds($variant) as $i => [$colorId, $sizeId]) {
                $color = $colorId ? $colors->get($colorId) : null;

                $pairs[] = [
                    'index' => $i,
                    'color_id' => $colorId,
                    'color_name' => $color?->name,
                    'color_hex' => $this->colorHex($color),
                    'size_id' => $sizeId,
                    'size_name' => $sizeId ? ($sizes[$sizeId] ?? null) : null,
                ];
            }

            $variant->attribute_pairs = $pairs;

            return $variant;
        })->values();
    }

    /**
     * Keep product variations in sync with the variant's color-size pairs. A
     * single image is uploaded for each color and shared by all of its sizes.
     */
    private function syncVariations(Product $product, array $pairs, Request $request): void
    {
        $existing = $product->variations()->get();
        $keep = [];
        $oldImagePaths = $existing->pluck('image')->filter()->unique()->values()->all();
        $colorImages = [];

        foreach ($pairs as $index => [$colorId, $sizeId]) {
            $colorKey = (string) $colorId;

            if (array_key_exists($colorKey, $colorImages)) {
                continue;
            }

            $firstExistingImage = $existing->first(
                fn ($variation) => (int) $variation->color_id === (int) $colorId && $variation->image
            )?->image;

            if ($request->hasFile("variations.$index.image")) {
                $firstExistingImage = $request->file("variations.$index.image")->store('products/variations', 'public');
            } elseif ($request->boolean("variations.$index.remove_image")) {
                $firstExistingImage = null;
            }

            $colorImages[$colorKey] = $firstExistingImage;
        }

        foreach ($pairs as [$colorId, $sizeId]) {
            $row = $existing->first(
                fn ($v) => (int) $v->color_id === (int) $colorId
                    && (int) $v->size_id === (int) $sizeId
                    && ! in_array($v->id, $keep, true)
            ) ?? new ProductVariation(['product_id' => $product->id]);

            $row->color_id = $colorId;
            $row->size_id = $sizeId;
            $row->image = $colorImages[(string) $colorId] ?? null;

            $row->save();
            $keep[] = $row->id;
        }

        // Pairs that no longer exist on the variant
        foreach ($existing as $row) {
            if (! in_array($row->id, $keep, true)) {
                $row->delete();
            }
        }

        $remainingImagePaths = $product->variations()
            ->whereNotNull('image')
            ->pluck('image')
            ->unique()
            ->all();

        foreach ($oldImagePaths as $imagePath) {
            if (! in_array($imagePath, $remainingImagePaths, true)) {
                $this->deleteFile($imagePath);
            }
        }
    }

    private function deleteFile(?string $path): void
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }

    private function operationFailed(string $operation, Throwable $exception): RedirectResponse
    {
        Log::error("Failed to {$operation}.", ['exception' => $exception]);

        return back()->with('error', 'The request could not be completed. Please try again.');
    }
}
