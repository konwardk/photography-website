<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PhotoCategory;
use Illuminate\Http\Request;

class PhotoCategoryController extends Controller
{
    public function index()
    {
        $categories = PhotoCategory::withCount('photos')->latest()->get();
        return inertia('admin/categories/index', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_name' => ['required', 'string', 'max:255', 'unique:photo_categories,category_name'],
        ]);

        PhotoCategory::create([
            'category_name' => $request->category_name,
        ]);

        return redirect()->back()->with('success', 'Category created successfully.');
    }

    public function update(Request $request, PhotoCategory $category)
    {
        $request->validate([
            'category_name' => ['required', 'string', 'max:255', 'unique:photo_categories,category_name,' . $category->id],
        ]);

        $category->update([
            'category_name' => $request->category_name,
        ]);

        return redirect()->back()->with('success', 'Category updated successfully.');
    }

    public function destroy(PhotoCategory $category)
    {
        $category->delete();
        
        return redirect()->back()->with('success', 'Category deleted successfully.');
    }
}
