<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\Category;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Inertia::share([
            'headerCategories' => Inertia::defer(function () {

                // Small delay for testing skeleton loading
                // sleep(1);

                return Category::query()
                    ->where('show_in_header', true)
                    ->where('status', 'active')
                    ->with([
                        'subCategories' => function ($query) {
                            $query
                                ->where('show_in_menu', true)
                                ->where('status', 'active')
                                ->select([
                                    'id',
                                    'category_id',
                                    'name',
                                ])
                                ->orderBy('name');
                        },
                    ])
                    ->select([
                        'id',
                        'name',
                        'ui_id',
                    ])
                    ->orderBy('name')
                    ->get();
            }),
        ]);
    }
}