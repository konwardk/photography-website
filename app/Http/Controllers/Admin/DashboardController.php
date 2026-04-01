<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use App\Models\PhotoCategory;
use App\Models\Blog;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'categories' => PhotoCategory::count(),
                'photos' => Photo::count(),
                'blogs' => Blog::count(),
                'book_reviews' => 0, // Placeholder
            ]
        ]);
    }
}
