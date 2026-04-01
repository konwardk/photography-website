<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

use App\Http\Controllers\PublicViewController;

Route::get('/', [PublicViewController::class, 'index'])->name('home');

Route::get('/portfolio', [PublicViewController::class, 'portfolio'])->name('portfolio');
Route::inertia('/about', 'publicView/about')->name('about');
Route::get('/blog', [PublicViewController::class, 'blogs'])->name('blog.index');
Route::get('/blog/{blog}', [PublicViewController::class, 'showBlog'])->name('blog.show');
Route::get('/reviews', [PublicViewController::class, 'books'])->name('books.reviews');
Route::get('/reviews/{book}', [PublicViewController::class, 'showBook'])->name('books.show');
Route::inertia('/contact', 'publicView/contact')->name('contact');

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PhotoCategoryController;
use App\Http\Controllers\Admin\PhotoController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\BookReviewController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Photo Categories
    Route::get('/admin/categories', [PhotoCategoryController::class, 'index'])->name('admin.categories.index');
    Route::post('/admin/categories', [PhotoCategoryController::class, 'store'])->name('admin.categories.store');
    Route::put('/admin/categories/{category}', [PhotoCategoryController::class, 'update'])->name('admin.categories.update');
    Route::delete('/admin/categories/{category}', [PhotoCategoryController::class, 'destroy'])->name('admin.categories.destroy');

    // Photos
    Route::get('/admin/photos', [PhotoController::class, 'index'])->name('admin.photos.index');
    Route::get('/admin/photos/category/{category}', [PhotoController::class, 'showByCategory'])->name('admin.photos.category');
    Route::post('/admin/photos', [PhotoController::class, 'store'])->name('admin.photos.store');
    Route::put('/admin/photos/{photo}', [PhotoController::class, 'update'])->name('admin.photos.update');
    Route::delete('/admin/photos/{photo}', [PhotoController::class, 'destroy'])->name('admin.photos.destroy');

    // Blogs
    Route::resource('/admin/blogs', BlogController::class, [
        'names' => 'admin.blogs',
        'except' => ['show']
    ]);

    // Books
    Route::resource('/admin/books', BookController::class, [
        'names' => 'admin.books',
        'except' => ['show']
    ]);

    // Book Reviews
    Route::resource('/admin/book-reviews', BookReviewController::class, [
        'names' => 'admin.book-reviews',
        'except' => ['show']
    ]);
});

require __DIR__.'/settings.php';
