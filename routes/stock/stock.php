<?php

use App\Http\Controllers\Stock\MaterialController;
use App\Http\Controllers\Stock\ProductController;
use App\Http\Controllers\Stock\VariantController;
use Illuminate\Support\Facades\Route;

Route::prefix('variant')->name('variant.')->group(function () {
    Route::get('/', [VariantController::class, 'index'])->name('index');
    Route::get('/create', [VariantController::class, 'create'])->name('create');
    Route::post('/store', [VariantController::class, 'store'])->name('store');
    Route::get('/bulk-edit', [VariantController::class, 'bulkEdit'])->name('bulk-edit');
    Route::put('/bulk-update', [VariantController::class, 'bulkUpdate'])->name('bulk-update');
    Route::get('/export', [VariantController::class, 'export'])->name('export');
    Route::get('/print', [VariantController::class, 'print'])->name('print');
    Route::get('/edit/{variant}', [VariantController::class, 'edit'])->name('edit');
    Route::put('/update/{variant}', [VariantController::class, 'update'])->name('update');
    Route::delete('/destroy/{variant}', [VariantController::class, 'destroy'])->name('destroy');
});

Route::prefix('material')->name('material.')->group(function () {
    Route::get('/', [MaterialController::class, 'index'])->name('index');
    Route::get('/create', [MaterialController::class, 'create'])->name('create');
    Route::post('/store', [MaterialController::class, 'store'])->name('store');
    Route::get('/edit/{id}', [MaterialController::class, 'edit'])->name('edit');
    Route::put('/update/{material}', [MaterialController::class, 'update'])->name('update');
    Route::delete('/destroy/{material}', [MaterialController::class, 'destroy'])->name('destroy');
});

Route::prefix('product')->name('product.')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('index');
    Route::get('/create', [ProductController::class, 'create'])->name('create');
    Route::post('/', [ProductController::class, 'store'])->name('store');
    Route::get('/{product}/edit', [ProductController::class, 'edit'])->name('edit');
    Route::put('/{product}', [ProductController::class, 'update'])->name('update');
    Route::patch('/{product}/toggle', [ProductController::class, 'toggle'])->name('toggle');
    Route::delete('/{product}', [ProductController::class, 'destroy'])->name('destroy');
});
