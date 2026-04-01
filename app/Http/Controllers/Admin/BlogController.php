<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::latest()->paginate(10);
        return Inertia::render('admin/blogs/index', [
            'blogs' => $blogs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/blogs/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('STore payload', $request->all());
        
        try {
            $validated = $request->validate([
                'blog_title' => 'required|string|max:255',
                'blog_content' => 'required|string',
                'images.*' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:15360',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Illuminate\Support\Facades\Log::error('Validation crashed: ' . json_encode($e->errors()));
            throw $e;
        }

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('blogs', $filename, 'public');
                $imagePaths[] = $path;
            }
        }

        Blog::create([
            'blog_title' => $validated['blog_title'],
            'blog_content' => $validated['blog_content'],
            'images' => empty($imagePaths) ? null : $imagePaths,
        ]);

        return redirect()->route('admin.blogs.index')
            ->with('success', 'Blog created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        // Typically not needed in a simple admin CRUD if you're just editing
        return Inertia::render('admin/blogs/show', [
            'blog' => $blog
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        return Inertia::render('admin/blogs/edit', [
            'blog' => $blog
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'blog_title' => 'required|string|max:255',
            'blog_content' => 'required|string',
            'new_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:15360',
            'retained_images' => 'nullable|array',
            'retained_images.*' => 'string'
        ]);

        $retainedImages = $request->input('retained_images', []);
        $currentImages = is_array($blog->images) ? $blog->images : [];

        // Check for images that were deleted by the user and clean them out of the storage drive permanently
        $deletedImages = array_diff($currentImages, $retainedImages);
        foreach ($deletedImages as $deletedPath) {
            if (Storage::disk('public')->exists($deletedPath)) {
                Storage::disk('public')->delete($deletedPath);
            }
        }

        // Catch the brand new incoming uploads seamlessly
        $newUploadedPaths = [];
        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $file) {
                $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('blogs', $filename, 'public');
                $newUploadedPaths[] = $path;
            }
        }

        // Merge arrays mapping existing survivals and fresh uploads flawlessly
        $finalImagePaths = array_merge($retainedImages, $newUploadedPaths);

        $blog->update([
            'blog_title' => $validated['blog_title'],
            'blog_content' => $validated['blog_content'],
            'images' => empty($finalImagePaths) ? null : $finalImagePaths,
        ]);

        return redirect()->route('admin.blogs.index')
            ->with('success', 'Blog and massive galleries updated securely.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        if ($blog->images && is_array($blog->images)) {
            foreach ($blog->images as $path) {
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }
        }

        $blog->delete();

        return redirect()->route('admin.blogs.index')
            ->with('success', 'Blog deleted successfully.');
    }
}
