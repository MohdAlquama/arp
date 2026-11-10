<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HomeCategory;

class HomeCategoryApiController extends Controller
{
    /**
     * Public endpoint for the storefront "Shop By Category" section.
     * GET /api/home-categories
     */
    public function index()
    {
        $categories = HomeCategory::active()
            ->ordered()
            ->get()
            ->map(fn (HomeCategory $c) => [
                'id'       => $c->id,
                'name'     => $c->name,
                'subtitle' => $c->subtitle,
                'image'    => $c->image_url,
                'href'     => $c->href,
            ])
            ->values();

        return response()->json($categories);
    }
}
