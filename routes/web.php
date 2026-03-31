<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

use App\Http\Controllers\PublicViewController;

Route::get('/', [PublicViewController::class, 'index'])->name('home');

Route::get('/portfolio', [PublicViewController::class, 'portfolio'])->name('portfolio');
Route::inertia('/about', 'publicView/about')->name('about');

use App\Http\Controllers\Admin\PhotoCategoryController;
use App\Http\Controllers\Admin\PhotoController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/dashboard', 'dashboard')->name('dashboard');
    
    // Photo Categories
    Route::get('/admin/categories', [PhotoCategoryController::class, 'index'])->name('admin.categories.index');
    Route::post('/admin/categories', [PhotoCategoryController::class, 'store'])->name('admin.categories.store');
    Route::put('/admin/categories/{category}', [PhotoCategoryController::class, 'update'])->name('admin.categories.update');
    Route::delete('/admin/categories/{category}', [PhotoCategoryController::class, 'destroy'])->name('admin.categories.destroy');

    // Photos
    Route::get('/admin/photos', [PhotoController::class, 'index'])->name('admin.photos.index');
    Route::post('/admin/photos', [PhotoController::class, 'store'])->name('admin.photos.store');
    Route::put('/admin/photos/{photo}', [PhotoController::class, 'update'])->name('admin.photos.update');
    Route::delete('/admin/photos/{photo}', [PhotoController::class, 'destroy'])->name('admin.photos.destroy');
});

require __DIR__.'/settings.php';
