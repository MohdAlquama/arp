<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Models\HomeCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeCategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('WebPanel/Website/HomeCategories/Index', [
            // Deferred: page opens instantly with a skeleton, data loads right after
            'categories' => Inertia::defer(fn () => HomeCategory::ordered()->get()),
        ]);
    }

    public function create()
    {
        return Inertia::render('WebPanel/Website/HomeCategories/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => ['required', 'string', 'max:100'],
            'subtitle'   => ['nullable', 'string', 'max:150'],
            'image'      => ['required', 'image', 'mimes:png,jpg,jpeg,webp', 'max:4096'],
            'href'       => ['required', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'status'     => ['required', 'boolean'],
        ]);

        HomeCategory::create([
            'name'       => $validated['name'],
            'subtitle'   => $validated['subtitle'] ?? null,
            'image_path' => $request->file('image')->store('website/categories', 'public'),
            'href'       => $validated['href'],
            'sort_order' => $validated['sort_order'] ?? 0,
            'status'     => $request->boolean('status'),
        ]);

        return redirect()
            ->route('admin.website.categories.index')
            ->with('success', 'Category tile created successfully.');
    }

    public function edit(HomeCategory $homeCategory)
    {
        return Inertia::render('WebPanel/Website/HomeCategories/Edit', [
            'category' => $homeCategory,
        ]);
    }

    public function update(Request $request, HomeCategory $homeCategory)
    {
        $validated = $request->validate([
            'name'       => ['required', 'string', 'max:100'],
            'subtitle'   => ['nullable', 'string', 'max:150'],
            'image'      => ['nullable', 'image', 'mimes:png,jpg,jpeg,webp', 'max:4096'],
            'href'       => ['required', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'status'     => ['required', 'boolean'],
        ]);

        $imagePath = $homeCategory->image_path;

        if ($request->hasFile('image')) {
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('website/categories', 'public');
        }

        $homeCategory->update([
            'name'       => $validated['name'],
            'subtitle'   => $validated['subtitle'] ?? null,
            'image_path' => $imagePath,
            'href'       => $validated['href'],
            'sort_order' => $validated['sort_order'] ?? 0,
            'status'     => $request->boolean('status'),
        ]);

        return redirect()
            ->route('admin.website.categories.index')
            ->with('success', 'Category tile updated successfully.');
    }

    public function destroy(HomeCategory $homeCategory)
    {
        if ($homeCategory->image_path) {
            Storage::disk('public')->delete($homeCategory->image_path);
        }

        $homeCategory->delete();

        return redirect()
            ->route('admin.website.categories.index')
            ->with('success', 'Category tile deleted successfully.');
    }
}
