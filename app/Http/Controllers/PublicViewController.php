<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\PhotoCategory;
use Illuminate\Http\Request;

class PublicViewController extends Controller
{
    public function portfolio()
    {
        // Get all categories that actually have at least one photo attached.
        $categories = PhotoCategory::has('photos')->orderBy('category_name')->get();
        
        // Get all photos, eagerly load the category data
        $photos = Photo::with('category')->latest()->get();

        return inertia('publicView/portfolio', [
            'categories' => $categories,
            'photos' => $photos,
        ]);
    }
}
