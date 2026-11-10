<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewArrival;
use Illuminate\Http\Request;

class NewArrivalApiController extends Controller
{
    /**
     * Public endpoint for the storefront "New Arrivals" section.
     * GET /api/new-arrivals?limit=8
     */
    public function index(Request $request)
    {
        $limit = min(max((int) $request->query('limit', 8), 1), 24);

        $items = NewArrival::active()
            ->ordered()
            ->limit($limit)
            ->get()
            ->map(fn (NewArrival $p) => [
                'id'            => $p->id,
                'name'          => $p->name,
                'category'      => $p->category_label,
                'image'         => $p->image_url,
                'hoverImage'    => $p->hover_image_url,
                'price'         => (float) $p->price,
                'oldPrice'      => $p->old_price !== null ? (float) $p->old_price : null,
                'discount'      => $p->discount_percent,
                'badge'         => $p->badge,
                'href'          => $p->href,
            ])
            ->values();

        return response()->json($items);
    }
}
