<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use App\Models\PhotoCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    public function index()
    {
        $photos = Photo::with('category')->latest()->get();
        $categories = PhotoCategory::orderBy('category_name')->get();
        
        return inertia('admin/photos/index', [
            'photos' => $photos,
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => ['required', 'exists:photo_categories,id'],
            'photo' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:15360'], // 15MB max for high quality
            'is_favourite' => ['boolean'],
            'is_carousal' => ['boolean'],
        ]);

        $category = PhotoCategory::findOrFail($request->category_id);
        
        $folderName = Str::slug($category->category_name);

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            
            // Store the file inside `storage/app/public/photos/{category_name}`
            $path = $file->storeAs('photos/' . $folderName, $filename, 'public');

            Photo::create([
                'category_id' => $category->id,
                'path' => $path,
                'is_favourite' => $request->boolean('is_favourite', false),
                'is_carousal' => $request->boolean('is_carousal', false),
            ]);

            return redirect()->back()->with('success', 'Photo uploaded successfully.');
        }

        return redirect()->back()->withErrors(['photo' => 'Photo upload failed.']);
    }

    public function update(Request $request, Photo $photo)
    {
        $request->validate([
            'category_id' => ['exists:photo_categories,id'],
            'is_favourite' => ['boolean'],
            'is_carousal' => ['boolean'],
        ]);
        
        // Handle moving file if category changed
        if ($request->has('category_id') && $request->category_id != $photo->category_id) {
            $newCategory = PhotoCategory::findOrFail($request->category_id);
            $newFolderName = Str::slug($newCategory->category_name);
            
            $filename = basename($photo->path);
            $newPath = 'photos/' . $newFolderName . '/' . $filename;
            
            if (Storage::disk('public')->exists($photo->path)) {
                Storage::disk('public')->move($photo->path, $newPath);
                $photo->path = $newPath;
            }
            $photo->category_id = $newCategory->id;
        }

        $photo->is_favourite = $request->boolean('is_favourite', $photo->is_favourite);
        $photo->is_carousal = $request->boolean('is_carousal', $photo->is_carousal);
        $photo->save();

        return redirect()->back()->with('success', 'Photo details updated successfully.');
    }

    public function destroy(Photo $photo)
    {
        if (Storage::disk('public')->exists($photo->path)) {
            Storage::disk('public')->delete($photo->path);
        }

        $photo->delete();

        return redirect()->back()->with('success', 'Photo deleted successfully.');
    }
}
