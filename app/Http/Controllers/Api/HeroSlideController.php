<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HomeSection;

class HeroSlideController extends Controller
{
    /**
     * Public endpoint used by the storefront hero slider.
     * GET /api/hero-slides
     */
    public function index()
    {
        $slides = HomeSection::active()
            ->ordered()
            ->get()
            ->map(fn (HomeSection $s, int $i) => [
                'id'          => $s->id,
                'subtitle'    => $s->subtitle,
                'title'       => $s->title,
                'highlight'   => $s->highlight,
                'description' => $s->description,
                'image'       => $s->image_url,
                'button'      => $s->has_button ? $s->button_text : null,
                'link'        => $s->has_button ? $s->button_link : null,
                'label'       => str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT),
            ])
            ->values();

        return response()->json($slides);
    }
}
