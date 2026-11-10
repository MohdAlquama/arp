<?php

namespace App\Http\Controllers\Attributes;

use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ColorsController extends Controller
{
   public function index(Request $request)
{
    $query = Color::query()
        ->when($request->search, fn ($q, $s) => $q->where(function ($q) use ($s) {
            $q->where('name', 'like', "%{$s}%")
              ->orWhere('hex_code', 'like', "%{$s}%");
        }))
        ->when($request->status, fn ($q, $s) => $q->where('status', $s))
        ->latest();

    return Inertia::render('WebPanel/Attributes/Colors/Index', [
        'colors' => Inertia::defer(fn () => $query->paginate(10)->withQueryString()),
        'filters' => $request->only('search', 'status'),
    ]);
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255|unique:colors,name',
            'hex_code' => 'required|string|max:20', // कलर कोड के लिए
            'status'   => 'required|string|in:active,draft',
        ]);

        try {
            Color::create($validated);
            return back()->with('success', 'Color added successfully.');
        } catch (\Exception $e) {
            Log::error('Error creating color: ' . $e->getMessage());
            return back()->withErrors([
                'error' => 'Something went wrong while creating the color. Please try again.'
            ])->withInput();
        }
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255|unique:colors,name,' . $id,
            'hex_code' => 'required|string|max:20',
            'status'   => 'required|string|in:active,draft',
        ]);

        try {
            $color = Color::findOrFail($id);
            $color->update($validated);
            return back()->with('success', 'Color updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating color ID ' . $id . ': ' . $e->getMessage());
            return back()->withErrors([
                'error' => 'Something went wrong while updating the color. Please try again.'
            ])->withInput();
        }
    }

    public function destroy($id)
    {
        try {
            $color = Color::findOrFail($id);
            $color->delete();
            return back()->with('success', 'Color deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting color ID ' . $id . ': ' . $e->getMessage());
            return back()->withErrors([
                'error' => 'Could not delete the color. It might be in use.'
            ]);
        }
    }
}
