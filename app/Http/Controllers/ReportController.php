<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Color;
use App\Models\Material;
use App\Models\Product;
use App\Models\Size;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportController extends Controller
{
    private const REPORT_TYPES = [
        'all' => 'All Data',
        'products' => 'Products',
        'variants' => 'Variants',
        'categories' => 'Categories',
        'subcategories' => 'Subcategories',
        'materials' => 'Materials',
        'sizes' => 'Sizes',
        'colors' => 'Colors',
    ];

    public function index(Request $request)
    {
        $validated = $request->validate([
            'type' => ['sometimes', 'string', Rule::in(array_keys(self::REPORT_TYPES))],
        ]);

        $type = $validated['type'] ?? 'all';

        return Inertia::render('WebPanel/Reports/Index', [
            'types' => self::REPORT_TYPES,
            'selectedType' => $type,
            'report' => Inertia::defer(fn () => $this->reportData($type)),
        ]);
    }

    public function export(Request $request): StreamedResponse
    {
        $validated = $request->validate([
            'type' => ['required', 'string', Rule::in(array_keys(self::REPORT_TYPES))],
        ]);

        $type = $validated['type'];
        $report = $this->reportData($type);
        $filename = 'arp-'.$type.'-report-'.now()->format('Y-m-d').'.csv';

        return response()->streamDownload(function () use ($report) {
            $output = fopen('php://output', 'w');
            fwrite($output, "\xEF\xBB\xBF");
            fputcsv($output, $report['columns']);

            foreach ($report['rows'] as $row) {
                fputcsv($output, array_values($row));
            }

            fclose($output);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    /** @return array{columns: list<string>, rows: list<array<string, string|int>>} */
    private function reportData(string $type): array
    {
        $rows = $type === 'all'
            ? collect(array_keys(self::REPORT_TYPES))
                ->reject(fn (string $reportType) => $reportType === 'all')
                ->flatMap(fn (string $reportType) => $this->rowsFor($reportType))
                ->values()
                ->all()
            : $this->rowsFor($type);

        return [
            'columns' => ['Type', 'ID', 'Name', 'Details', 'Status', 'Created at'],
            'rows' => $rows,
        ];
    }

    /** @return list<array{type: string, id: int, name: string, details: string, status: string, created_at: string}> */
    private function rowsFor(string $type): array
    {
        return match ($type) {
            'products' => Product::query()
                ->join('variants', 'products.variant_id', '=', 'variants.id')
                ->join('categories', 'variants.category_id', '=', 'categories.id')
                ->join('sub_categories', 'variants.sub_category_id', '=', 'sub_categories.id')
                ->select([
                    'products.id', 'products.display_name as name', 'products.is_published',
                    'products.is_promotional', 'products.created_at', 'variants.article_no',
                    'categories.name as category_name', 'sub_categories.name as sub_category_name',
                ])
                ->orderBy('products.id')
                ->get()
                ->map(fn ($product) => $this->row('Product', $product->id, $product->name,
                    "Article: {$product->article_no}; Category: {$product->category_name}; Subcategory: {$product->sub_category_name}; Promotional: ".($product->is_promotional ? 'Yes' : 'No'),
                    $product->is_published ? 'Published' : 'Draft', $product->created_at))
                ->all(),
            'variants' => $this->variantRows(),
            'categories' => Category::query()->orderBy('id')->get(['id', 'name', 'status', 'created_at'])
                ->map(fn ($item) => $this->row('Category', $item->id, $item->name, '', $item->status, $item->created_at))->all(),
            'subcategories' => DB::table('sub_categories')->join('categories', 'sub_categories.category_id', '=', 'categories.id')
                ->orderBy('sub_categories.id')
                ->get(['sub_categories.id', 'sub_categories.name', 'sub_categories.status', 'sub_categories.created_at', 'categories.name as category_name'])
                ->map(fn ($item) => $this->row('Subcategory', $item->id, $item->name, "Category: {$item->category_name}", $item->status, $item->created_at))->all(),
            'materials' => Material::query()->orderBy('id')->get(['id', 'material_name', 'material_code', 'status', 'created_at'])
                ->map(fn ($item) => $this->row('Material', $item->id, $item->material_name, 'Code: '.($item->material_code ?: '—'), $item->status ? 'Active' : 'Inactive', $item->created_at))->all(),
            'sizes' => Size::query()->orderBy('id')->get(['id', 'name', 'status', 'created_at'])
                ->map(fn ($item) => $this->row('Size', $item->id, $item->name, '', $item->status, $item->created_at))->all(),
            'colors' => Color::query()->orderBy('id')->get(['id', 'name', 'hex_code', 'status', 'created_at'])
                ->map(fn ($item) => $this->row('Color', $item->id, $item->name, 'Hex: '.($item->hex_code ?: '—'), $item->status, $item->created_at))->all(),
            default => [],
        };
    }

    /** @return list<array{type: string, id: int, name: string, details: string, status: string, created_at: string}> */
    private function variantRows(): array
    {
        return Variant::query()
            ->join('categories', 'variants.category_id', '=', 'categories.id')
            ->join('sub_categories', 'variants.sub_category_id', '=', 'sub_categories.id')
            ->join('materials', 'variants.material_id', '=', 'materials.id')
            ->orderBy('variants.id')
            ->get([
                'variants.id', 'variants.article_no', 'variants.default_name', 'variants.color_ids',
                'variants.size_ids', 'variants.status', 'variants.created_at',
                'categories.name as category_name', 'sub_categories.name as sub_category_name',
                'materials.material_name',
            ])
            ->map(function (Variant $variant) {
                $colorNames = Color::whereIn('id', $this->decodeIds($variant->color_ids))->pluck('name')->implode(', ');
                $sizeNames = Size::whereIn('id', $this->decodeIds($variant->size_ids))->pluck('name')->implode(', ');
                $details = "Article: {$variant->article_no}; Category: {$variant->category_name}; Subcategory: {$variant->sub_category_name}; Material: {$variant->material_name}; Colors: ".($colorNames ?: '—').'; Sizes: '.($sizeNames ?: '—');

                return $this->row('Variant', $variant->id, $variant->default_name, $details, $variant->status, $variant->created_at);
            })
            ->all();
    }

    private function decodeIds(mixed $value): array
    {
        if (is_string($value)) {
            $value = json_decode($value, true);
        }

        return is_array($value) ? array_values(array_filter($value)) : [];
    }

    private function row(string $type, int $id, string $name, string $details, string $status, mixed $createdAt): array
    {
        return [
            'type' => $type,
            'id' => $id,
            'name' => $name,
            'details' => $details,
            'status' => $status,
            'created_at' => (string) $createdAt,
        ];
    }
}
