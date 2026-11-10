<?php

namespace App\Http\Controllers\Attributes;

use App\Http\Controllers\Controller;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Logs के लिए ज़रूरी
use Inertia\Inertia;

class SizeController extends Controller
{
    /**
     * Display the size index page with deferred loading.
     */
  
    public function index(Request $request)
{
    $query = Size::query()
        ->when($request->search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
        ->when($request->status, fn ($q, $s) => $q->where('status', $s))
        ->latest();

    return Inertia::render('WebPanel/Attributes/Size/Index', [
        'sizes' => Inertia::defer(fn () => $query->paginate(10)->withQueryString()),
        'filters' => $request->only('search', 'status'),
    ]);
}

    /**
     * Store a newly created size.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255|unique:sizes,name',
            'status' => 'required|string|in:active,draft',
        ]);

        try {
            Size::create($validated);
            return back()->with('success', 'Size added successfully.');

        } catch (\Exception $e) {
            Log::error('Error creating size: ' . $e->getMessage());
            
            return back()->withErrors([
                'error' => 'Something went wrong while creating the size. Please try again.'
            ])->withInput();
        }
    }

    /**
     * Update the specified size.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255|unique:sizes,name,' . $id,
            'status' => 'required|string|in:active,draft',
        ]);

        try {
            $size = Size::findOrFail($id);
            $size->update($validated);

            return back()->with('success', 'Size updated successfully.');

        } catch (\Exception $e) {
            Log::error('Error updating size ID ' . $id . ': ' . $e->getMessage());
            
            return back()->withErrors([
                'error' => 'Something went wrong while updating the size. Please try again.'
            ])->withInput();
        }
    }

    /**
     * Remove the specified size.
     */
    public function destroy($id)
    {
        try {
            $size = Size::findOrFail($id);
            $size->delete();

            return back()->with('success', 'Size deleted successfully.');

        } catch (\Exception $e) {
            Log::error('Error deleting size ID ' . $id . ': ' . $e->getMessage());
            
            return back()->withErrors([
                'error' => 'Could not delete the size. It might be in use.'
            ]);
        }
    }
}