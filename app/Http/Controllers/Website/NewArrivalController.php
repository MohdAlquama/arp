<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Models\NewArrival;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NewArrivalController extends Controller
{
    public function index()
    {
        return Inertia::render('WebPanel/Website/NewArrivals/Index', [
            // Deferred: page opens instantly with a skeleton, data loads right after
            'arrivals' => Inertia::defer(fn () => NewArrival::ordered()->get()),
        ]);
    }

    public function create()
    {
        return Inertia::render('WebPanel/Website/NewArrivals/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate($this->rules(creating: true));

        NewArrival::create([
            'name'             => $validated['name'],
            'category_label'   => $validated['category_label'] ?? null,
            'image_path'       => $request->file('image')->store('website/new-arrivals', 'public'),
            'hover_image_path' => $request->hasFile('hover_image')
                ? $request->file('hover_image')->store('website/new-arrivals', 'public')
                : null,
            'price'            => $validated['price'],
            'old_price'        => $validated['old_price'] ?? null,
            'badge'            => $validated['badge'] ?? null,
            'href'             => $validated['href'],
            'sort_order'       => $validated['sort_order'] ?? 0,
            'status'           => $request->boolean('status'),
        ]);

        return redirect()
            ->route('admin.website.new-arrivals.index')
            ->with('success', 'New arrival created successfully.');
    }

    public function edit(NewArrival $newArrival)
    {
        return Inertia::render('WebPanel/Website/NewArrivals/Edit', [
            'arrival' => $newArrival,
        ]);
    }

    public function update(Request $request, NewArrival $newArrival)
    {
        $validated = $request->validate($this->rules(creating: false));

        $imagePath      = $newArrival->image_path;
        $hoverImagePath = $newArrival->hover_image_path;

        if ($request->hasFile('image')) {
            $this->deleteFile($imagePath);
            $imagePath = $request->file('image')->store('website/new-arrivals', 'public');
        }

        if ($request->hasFile('hover_image')) {
            $this->deleteFile($hoverImagePath);
            $hoverImagePath = $request->file('hover_image')->store('website/new-arrivals', 'public');
        } elseif ($request->boolean('remove_hover_image')) {
            $this->deleteFile($hoverImagePath);
            $hoverImagePath = null;
        }

        $newArrival->update([
            'name'             => $validated['name'],
            'category_label'   => $validated['category_label'] ?? null,
            'image_path'       => $imagePath,
            'hover_image_path' => $hoverImagePath,
            'price'            => $validated['price'],
            'old_price'        => $validated['old_price'] ?? null,
            'badge'            => $validated['badge'] ?? null,
            'href'             => $validated['href'],
            'sort_order'       => $validated['sort_order'] ?? 0,
            'status'           => $request->boolean('status'),
        ]);

        return redirect()
            ->route('admin.website.new-arrivals.index')
            ->with('success', 'New arrival updated successfully.');
    }

    /** Quick show/hide from the list page. */
    public function toggle(NewArrival $newArrival)
    {
        $newArrival->update(['status' => ! $newArrival->status]);

        return back()->with(
            'success',
            $newArrival->status ? 'Product is now visible.' : 'Product is now hidden.'
        );
    }

    public function destroy(NewArrival $newArrival)
    {
        $this->deleteFile($newArrival->image_path);
        $this->deleteFile($newArrival->hover_image_path);

        $newArrival->delete();

        return redirect()
            ->route('admin.website.new-arrivals.index')
            ->with('success', 'New arrival deleted successfully.');
    }

    // ------------------------------------------------------------------

    private function rules(bool $creating): array
    {
        return [
            'name'               => ['required', 'string', 'max:150'],
            'category_label'     => ['nullable', 'string', 'max:100'],
            'image'              => [$creating ? 'required' : 'nullable', 'image', 'mimes:png,jpg,jpeg,webp', 'max:4096'],
            'hover_image'        => ['nullable', 'image', 'mimes:png,jpg,jpeg,webp', 'max:4096'],
            'remove_hover_image' => ['nullable', 'boolean'],
            'price'              => ['required', 'numeric', 'min:0', 'max:9999999'],
            'old_price'          => ['nullable', 'numeric', 'gt:price', 'max:9999999'],
            'badge'              => ['nullable', 'string', 'max:30'],
            'href'               => ['required', 'string', 'max:255'],
            'sort_order'         => ['nullable', 'integer', 'min:0', 'max:9999'],
            'status'             => ['required', 'boolean'],
        ];
    }

    private function deleteFile(?string $path): void
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }
}
