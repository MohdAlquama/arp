<?php

namespace App\Http\Controllers\WebsiteController;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::query()
            ->when($request->search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->when($request->filled('header'), fn ($q) => $q->where('show_in_header', $request->boolean('header')))
            ->latest();

        return Inertia::render('WebPanel/Category/Index', [
            'categories' => Inertia::defer(fn () => $query->paginate(10)->withQueryString()),
            'filters' => $request->only('search', 'status', 'header'),
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('WebPanel/Category/Edit', [
            'category' => Inertia::defer(function () use ($id) {
                if (app()->isLocal()) {
                    sleep(2);
                }

                return Category::findOrFail($id);
            }),
        ]);
    }

    public function create()
    {
        return Inertia::render('WebPanel/Category/Create');
    }

    public function store(Request $request)
    {
        // 1. Validate incoming request including the new 'status' field
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'page_title' => 'nullable|string|max:255',
            'page_description' => 'nullable|string|max:5000',
            'banner_image' => 'nullable|image|max:5120',
            'show_in_header' => 'required|boolean',
            'ui_id' => 'nullable|integer',
            'status' => 'required|string|in:active,draft',
        ]);

        // 2. Try-Catch block for safe database execution
        try {
            if ($request->hasFile('banner_image')) {
                $validated['banner_image'] = $request->file('banner_image')->store('categories', 'public');
            }

            Category::create($validated);

            return redirect()->route('admin.website.category.index')
                ->with('success', 'Category created successfully.');

        } catch (\Exception $e) {
            Log::error('Error creating category: '.$e->getMessage());

            return back()->withErrors([
                'error' => 'An error occurred while creating the category. Please try again.',
            ])->withInput();
        }
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'page_title' => 'nullable|string|max:255',
            'page_description' => 'nullable|string|max:5000',
            'banner_image' => 'nullable|image|max:5120',
            'show_in_header' => 'required|boolean',
            'ui_id' => 'nullable|integer',
            'status' => 'required|string|in:active,draft',
        ]);

        try {
            if ($request->hasFile('banner_image')) {
                if ($category->banner_image) {
                    Storage::disk('public')->delete($category->banner_image);
                }

                $validated['banner_image'] = $request->file('banner_image')->store('categories', 'public');
            }

            $category->update($validated);

            return redirect()->route('admin.website.category.index')
                ->with('success', 'Category updated successfully.');

        } catch (\Exception $e) {
            Log::error('Error updating category: '.$e->getMessage());

            return back()->withErrors([
                'error' => 'An error occurred while updating the category. Please try again.',
            ])->withInput();
        }
    }

    /**
     * Remove the specified category from database.
     */
    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->delete();

            return redirect()->route('admin.website.category.index')
                ->with('success', 'Category deleted successfully.');

        } catch (\Exception $e) {
            Log::error('Error deleting category: '.$e->getMessage());

            return back()->withErrors([
                'error' => 'An error occurred while deleting the category.',
            ]);
        }
    }
}
