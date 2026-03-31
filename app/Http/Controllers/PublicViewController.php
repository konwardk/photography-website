<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\PhotoCategory;
use Illuminate\Http\Request;

class PublicViewController extends Controller
{
    public function index()
    {
        // Get up to 6 photos where is_carousal is true.
        $carouselPhotos = Photo::where('is_carousal', true)
            ->latest()
            ->take(6)
            ->get();

        // Fallback to latest 6 photos if no carousel photos are found.
        if ($carouselPhotos->isEmpty()) {
            $carouselPhotos = Photo::latest()->take(6)->get();
        }

        // Get favorite photos
        $favouritePhotos = Photo::where('is_favourite', true)
            ->with('category')
            ->latest()
            ->get();

        return inertia('welcome', [
            'carouselPhotos' => $carouselPhotos,
            'favouritePhotos' => $favouritePhotos,
        ]);
    }

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
