<?php

use App\Http\Controllers\Api\HeroSlideController;
use App\Http\Controllers\Api\HomeCategoryApiController;
use App\Http\Controllers\Api\NewArrivalApiController;
use App\Http\Controllers\HeaderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Website\ProductListingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/', function () {
    return Inertia::render('Website/Home/Index');
});
Route::get('/about', function () {
    return Inertia::render('Website/About/Index');
});
Route::get('/header', [HeaderController::class, 'index']);
Route::get('/products/category/{category}', [ProductListingController::class, 'index'])
    ->whereNumber('category')
    ->name('products.category');
Route::get('/products', [ProductListingController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [ProductListingController::class, 'show'])
    ->whereNumber('product')
    ->name('products.show');
Route::get('/y', function () {
    return Inertia::render('Website/Categories/MenCategories/Index');
});
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('api')->name('api')->group(function(){
    Route::get('/hero-slides', [HeroSlideController::class, 'index']);
    Route::get('/home-categories', [HomeCategoryApiController::class, 'index']);
    Route::get('/new-arrivals', [NewArrivalApiController::class, 'index']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
