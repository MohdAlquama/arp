<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class HeaderController extends Controller
{
    public function index()
    {
        $categories = Category::query()
            ->where('show_in_header', true)
            ->where('status', 'active')
            ->with([
                'subCategories' => function ($query) {
                    $query->where('show_in_menu', true)
                        ->where('status', 'active')
                        ->select('id', 'category_id', 'name');
                }
            ])
            ->select('id', 'name', 'ui_id')
            ->orderBy('name')
            ->get();

        return $categories;
    }
}