<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductListingController extends Controller
{
    public function index(Request $request, ?Category $category = null): Response
    {
        $categoryId = $category?->id ?? ($request->filled('category') ? $request->integer('category') : null);
        $subCategoryId = $request->filled('subcategory') ? $request->integer('subcategory') : null;
        $sort = in_array($request->input('sort'), ['latest', 'oldest'], true)
            ? $request->input('sort')
            : 'latest';

        $selectedCategory = $category ?? ($categoryId ? Category::query()->find($categoryId) : null);
        $selectedSubCategory = $subCategoryId ? SubCategory::query()
            ->where('category_id', $categoryId)
            ->where('status', 'active')
            ->find($subCategoryId) : null;
        $pageDesignCategory = $selectedCategory ?? Category::query()
            ->where('status', 'active')
            ->orderBy('id')
            ->first();

        $products = fn () => Product::query()
            ->where('is_published', true)
            ->whereHas('variant', function ($query) use ($categoryId, $subCategoryId) {
                $query->where('status', 'active')
                    ->when($categoryId, fn ($variantQuery) => $variantQuery->where('category_id', $categoryId))
                    ->when($subCategoryId, fn ($variantQuery) => $variantQuery->where('sub_category_id', $subCategoryId));
            })
            ->with([
                'variant:id,category_id,sub_category_id,default_name,article_no,status',
                'variant.category:id,name',
                'variant.subCategory:id,category_id,name',
            ])
            ->when($sort === 'oldest', fn ($query) => $query->oldest('products.created_at'))
            ->when($sort === 'latest', fn ($query) => $query->latest('products.created_at'))
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Website/Categories/Products/Index', [
            'products' => Inertia::defer($products),
            'categories' => Category::query()
                ->where('status', 'active')
                ->with(['subCategories' => fn ($query) => $query
                    ->where('status', 'active')
                    ->where('show_in_menu', true)
                    ->orderBy('name')
                    ->select('id', 'category_id', 'name')])
                ->orderBy('name')
                ->get(['id', 'name']),
            'filters' => [
                'category' => $categoryId,
                'subcategory' => $subCategoryId,
                'sort' => $sort,
            ],
            'selectedCategory' => $selectedCategory?->only(['id', 'name', 'page_title', 'page_description', 'banner_image_url', 'ui_id']),
            'pageDesignCategory' => $pageDesignCategory?->only(['id', 'name', 'page_title', 'page_description', 'banner_image_url', 'ui_id']),
            'selectedSubCategory' => $selectedSubCategory?->only(['id', 'name']),
        ]);
    }

    public function show(Product $product): Response
    {
        abort_unless(
            $product->is_published && $product->variant()->where('status', 'active')->exists(),
            404
        );

        return Inertia::render('Website/Categories/Products/Show', [
            'productPage' => Inertia::defer(function () use ($product) {
                $product->load([
                    'variant:id,category_id,sub_category_id,material_id,default_name,article_no,status',
                    'variant.category:id,name,page_title,page_description,banner_image,ui_id',
                    'variant.subCategory:id,category_id,name',
                    'variant.material:id,material_name',
                    'variations.color:id,name,hex_code',
                    'variations.size:id,name',
                ]);

                return [
                    'product' => $product,
                    'mainImageUrl' => $product->image_url
                        ?? $product->variations->first(fn ($variation) => $variation->image)?->image_url
                        ?? null,
                    'colorDisplay' => $product->color_display,
                    'variantRows' => $product->variations->map(fn ($variation) => [
                        'id' => $variation->id,
                        'color' => $variation->color?->name ?? 'Color unavailable',
                        'colorHex' => $variation->color?->hex_code,
                        'sizeId' => $variation->size_id,
                        'size' => $variation->size?->name ?? 'Size unavailable',
                        'imageUrl' => $variation->image_url,
                    ])->values(),
                ];
            }),
        ]);
    }
}
