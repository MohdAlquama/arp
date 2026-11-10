<?php

use App\Http\Controllers\Attributes\ColorsController;
use App\Http\Controllers\Attributes\SizeController;
use App\Http\Controllers\Website\HomeCategoryController;
use App\Http\Controllers\Website\HomeController;
use App\Http\Controllers\Website\NewArrivalController;
use App\Http\Controllers\WebsiteController\CategoryController;
use App\Http\Controllers\WebsiteController\SubCategoriesController;
use Illuminate\Support\Facades\Route;

Route::prefix('category')->name('category.')->group(function () {
    route::get('/', [CategoryController::class, 'index'])->name('index');
    Route::get('/create', [CategoryController::class, 'create'])->name('create');
    Route::post('/store', [CategoryController::class, 'store'])->name('store');
    Route::get('/edit/{id}', [CategoryController::class, 'edit'])->name('edit');
    Route::put('/update/{id}', [CategoryController::class, 'update'])->name('update');
    Route::delete('/destroy/{id}', [CategoryController::class, 'destroy'])->name('destroy');

});
Route::prefix('attributes')->name('attributes.')->group(function () {
    
    // Size Routes
 Route::prefix('size')->name('size.')->group(function () {
        Route::get('/', [SizeController::class, 'index'])->name('index');
        Route::post('/store', [SizeController::class, 'store'])->name('store');
        Route::put('/update/{id}', [SizeController::class, 'update'])->name('update');
        Route::delete('/destroy/{id}', [SizeController::class, 'destroy'])->name('destroy');
    });
    
    // Color Routes
    Route::prefix('color')->name('color.')->group(function () {
        Route::get('/', [ColorsController::class, 'index'])->name('index');
        Route::post('/store', [ColorsController::class, 'store'])->name('store');
        Route::put('/update/{id}', [ColorsController::class, 'update'])->name('update');
        Route::delete('/destroy/{id}', [ColorsController::class, 'destroy'])->name('destroy');
    });

});

Route::prefix('subcategory')->name('subcategory.')->group(function () {
    Route::get('/', [SubCategoriesController::class, 'index'])->name('index');
    Route::get('/create', [SubCategoriesController::class, 'create'])->name('create');
    Route::post('/store', [SubCategoriesController::class, 'store'])->name('store');
    Route::get('/edit/{subCategory}' , [SubCategoriesController::class, 'edit'])->name('edit');   
    Route::put('/update/{subCategory}', [SubCategoriesController::class, 'update'])->name('update');
    Route::delete('/destroy/{subCategory}', [SubCategoriesController::class, 'destroy'])->name('destroy');
});


Route::prefix('home')->name('home.')->group(function () {
Route::get('/', [HomeController::class, 'index'])->name('index');
    Route::get('/create', [HomeController::class, 'create'])->name('create');
    Route::post('/', [HomeController::class, 'store'])->name('store');
    Route::get('/{homeSection}/edit', [HomeController::class, 'edit'])->name('edit');
    Route::put('/{homeSection}', [HomeController::class, 'update'])->name('update');
    Route::delete('/{homeSection}', [HomeController::class, 'destroy'])->name('destroy');
});

Route::patch('new-arrivals/{newArrival}/toggle', [NewArrivalController::class, 'toggle'])
    ->name('new-arrivals.toggle');

Route::resource('new-arrivals', NewArrivalController::class)
    ->except(['show'])
    ->parameters(['new-arrivals' => 'newArrival']);

 Route::resource('categories', HomeCategoryController::class)
        ->except(['show'])
        ->parameters(['categories' => 'homeCategory']);