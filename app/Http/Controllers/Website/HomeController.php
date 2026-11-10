<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Models\HomeSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $sections = HomeSection::ordered()->get();

        return Inertia::render('WebPanel/Website/Home/Index', [
            'sections' => $sections,
        ]);
    }

    public function create()
    {
        return Inertia::render('WebPanel/Website/Home/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate($this->rules($request), $this->messages());

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('website/home', 'public');
        }

        $hasButton = $request->boolean('has_button');

        HomeSection::create([
            'subtitle'    => $validated['subtitle'] ?? null,
            'title'       => $validated['title'],
            'highlight'   => $validated['highlight'] ?? null,
            'description' => $validated['description'] ?? null,
            'image_path'  => $imagePath,
            'has_button'  => $hasButton,
            'button_text' => $hasButton ? $validated['button_text'] : null,
            'button_link' => $hasButton ? $validated['button_link'] : null,
            'sort_order'  => $validated['sort_order'] ?? 0,
            'status'      => $request->boolean('status'),
        ]);

        return redirect()
            ->route('admin.website.home.index')
            ->with('success', 'Home section created successfully.');
    }

    public function edit(HomeSection $homeSection)
    {
        return Inertia::render('WebPanel/Website/Home/Edit', [
            'section' => $homeSection,
        ]);
    }

    public function update(Request $request, HomeSection $homeSection)
    {
        $validated = $request->validate($this->rules($request), $this->messages());

        $imagePath = $homeSection->image_path;

        // User clicked "Remove" on the existing image
        if ($request->boolean('remove_image') && $imagePath) {
            Storage::disk('public')->delete($imagePath);
            $imagePath = null;
        }

        // New image uploaded: delete old one, store new one
        if ($request->hasFile('image')) {
            if ($homeSection->image_path) {
                Storage::disk('public')->delete($homeSection->image_path);
            }
            $imagePath = $request->file('image')->store('website/home', 'public');
        }

        $hasButton = $request->boolean('has_button');

        $homeSection->update([
            'subtitle'    => $validated['subtitle'] ?? null,
            'title'       => $validated['title'],
            'highlight'   => $validated['highlight'] ?? null,
            'description' => $validated['description'] ?? null,
            'image_path'  => $imagePath,
            'has_button'  => $hasButton,
            'button_text' => $hasButton ? $validated['button_text'] : null,
            'button_link' => $hasButton ? $validated['button_link'] : null,
            'sort_order'  => $validated['sort_order'] ?? 0,
            'status'      => $request->boolean('status'),
        ]);

        return redirect()
            ->route('admin.website.home.index')
            ->with('success', 'Home section updated successfully.');
    }

    public function destroy(HomeSection $homeSection)
    {
        if ($homeSection->image_path) {
            Storage::disk('public')->delete($homeSection->image_path);
        }

        $homeSection->delete();

        return redirect()
            ->route('admin.website.home.index')
            ->with('success', 'Home section deleted successfully.');
    }

    /**
     * Shared validation rules.
     * Rule::requiredIf is used because multipart uploads send booleans as "1"/"0".
     */
    private function rules(Request $request): array
    {
        $needsButton = fn () => $request->boolean('has_button');

        return [
            'subtitle'     => ['nullable', 'string', 'max:100'],
            'title'        => ['required', 'string', 'max:255'],
            'highlight'    => ['nullable', 'string', 'max:255'],
            'description'  => ['nullable', 'string', 'max:1000'],
            'image'        => ['nullable', 'image', 'mimes:png,jpg,jpeg,webp', 'max:4096'],
            'remove_image' => ['nullable', 'boolean'],
            'has_button'   => ['required', 'boolean'],
            'button_text'  => ['nullable', Rule::requiredIf($needsButton), 'string', 'max:100'],
            'button_link'  => ['nullable', Rule::requiredIf($needsButton), 'string', 'max:255'],
            'sort_order'   => ['nullable', 'integer', 'min:0', 'max:9999'],
            'status'       => ['required', 'boolean'],
        ];
    }

    private function messages(): array
    {
        return [
            'button_text.required' => 'Button text is required when the action button is enabled.',
            'button_link.required' => 'Button link is required when the action button is enabled.',
        ];
    }
}