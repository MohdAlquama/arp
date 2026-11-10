<?php

namespace App\Http\Controllers\Stock;

use App\Http\Controllers\Controller;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MaterialController extends Controller
{
    public function index()
    {
        return Inertia::render('WebPanel/Stock/Material/Index', [
            // Using defer to load the table data in the background
            'materials' => Inertia::defer(fn () => 
                Material::latest()->paginate(10)
            )
        ]);   
         }
        public function edit($id)
    {
        return Inertia::render('WebPanel/Stock/Material/Edit', [
            // Fetch the specific material inside the defer closure
            'material' => Inertia::defer(function () use ($id) {
                // sleep(1); // Optional: add this to test the skeleton visually
                return Material::findOrFail($id);
            })
        ]);
    }
    public function create()
    {
        return Inertia::render('WebPanel/Stock/Material/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'material_name' => 'required|string|max:255',
            'material_code' => 'nullable|string|max:100', // Optional
            'description'   => 'nullable|string',         // Optional
            'status'        => 'boolean',
        ]);

        try {
            Material::create($validated);

            return redirect()->route('admin.stock.material.index')
                ->with('success', 'Material created successfully.');

        } catch (\Exception $e) {
            Log::error('Error creating Material: ' . $e->getMessage());

            return back()->withInput()->with('error', 'Something went wrong while creating the Material.');
        }
    }
    public function update(Request $request, Material $material)
    {
        // 1. Validate the incoming request data
        $validated = $request->validate([
            'material_name' => 'required|string|max:255',
            'material_code' => 'nullable|string|max:100',
            'description'   => 'nullable|string',
            'status'        => 'boolean',
        ]);

        // 2. Safely update using try-catch
        try {
            $material->update($validated);

            return redirect()->route('admin.stock.material.index')
                ->with('success', 'Material updated successfully.');

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Error updating Material ID ' . $material->id . ': ' . $e->getMessage());

            return back()->withInput()->with('error', 'Something went wrong while updating the Material.');
        }
    }    
    public function destroy(Material $material)
    {
        try {
            // Delete the material
            $material->delete();

            // Redirect back to the table with a success message
            return redirect()->route('admin.stock.material.index')
                ->with('success', 'Material deleted successfully.');

        } catch (\Exception $e) {
            // Log the error for debugging
            \Illuminate\Support\Facades\Log::error('Error deleting Material ID ' . $material->id . ': ' . $e->getMessage());

            // Redirect back with an error message
            return back()->with('error', 'Something went wrong while deleting the Material.');
        }
    }
}
