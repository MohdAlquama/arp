<?php

namespace App\Http\Controllers\WebsiteController;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SubCategoriesController extends Controller
{
public function index(Request $request)
{
    $query = SubCategory::with('category:id,name')
        ->when($request->search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
        ->when($request->status, fn ($q, $s) => $q->where('status', $s))
        ->when($request->category, fn ($q, $c) => $q->where('category_id', $c))
        ->when($request->filled('menu'), fn ($q) => $q->where('show_in_menu', $request->boolean('menu')))
        ->latest();

    return Inertia::render('WebPanel/SubCategories/Index', [
        'subCategories' => Inertia::defer(fn () => $query->paginate(10)->withQueryString()),
        'filters' => $request->only('search', 'status', 'category', 'menu'),
        'categoryOptions' => Category::orderBy('name')->get(['id', 'name']),
    ]);
}

public function create()
    {
        return Inertia::render('WebPanel/SubCategories/Create', [
            // Wrap the query in Inertia::defer() to load it in the background
            'categories' => Inertia::defer(fn () => 
                Category::where('status', 'active')->select('id', 'name')->get()
            )
        ]);    
    }
public function edit(SubCategory $subCategory) 
    {
        return Inertia::render('WebPanel/SubCategories/Edit', [
            // 1. Send the subCategory immediately so the skeleton/page knows what we are editing
            'subCategory' => $subCategory,
            
            // 2. Defer the categories so the dropdown populates in the background
            'categories' => Inertia::defer(fn () => 
                Category::where('status', 'active')->select('id', 'name')->get()
            )
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'show_in_menu' => 'boolean',
            'status' => 'required|in:active,draft,inactive',
        ]);

        try {
            SubCategory::create($validated);

            return redirect()->route('admin.website.subcategory.index')
                ->with('success', 'Sub Category created successfully.');

        } catch (\Exception $e) {
            Log::error('Error creating SubCategory: ' . $e->getMessage());

            return back()->withInput()->with('error', 'Something went wrong while creating the Sub Category.');
        }
    }
    public function update(Request $request, SubCategory $subCategory)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'show_in_menu' => 'boolean',
            'status' => 'required|in:active,draft,inactive',
        ]);

        try {
            $subCategory->update($validated);

            return redirect()->route('admin.website.subcategory.index')
                ->with('success', 'Sub Category updated successfully.');

        } catch (\Exception $e) {
            Log::error('Error updating SubCategory ID ' . $subCategory->id . ': ' . $e->getMessage());

            return back()->withInput()->with('error', 'Something went wrong while updating the Sub Category.');
        }
    }
    public function destroy(SubCategory $subCategory)
    {
        try {
            $subCategory->delete();

            return redirect()->route('sub-categories.index')
                ->with('success', 'Sub Category deleted successfully.');

        } catch (\Exception $e) {
            Log::error('Error deleting SubCategory ID ' . $subCategory->id . ': ' . $e->getMessage());

            return back()->with('error', 'Something went wrong while deleting the Sub Category.');
        }
    }
}
