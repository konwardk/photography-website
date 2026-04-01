<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::latest()->paginate(10);
        return Inertia::render('admin/books/index', [
            'books' => $books
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/books/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_name' => 'required|string|max:255',
            'published_date' => 'required|date',
            'publisher_name' => 'required|string|max:255',
            'cover_image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'description' => 'nullable|string',
        ]);

        $coverImagePath = null;
        if ($request->hasFile('cover_image')) {
            $file = $request->file('cover_image');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $coverImagePath = $file->storeAs('books', $filename, 'public');
        }

        Book::create([
            'book_name' => $validated['book_name'],
            'published_date' => $validated['published_date'],
            'publisher_name' => $validated['publisher_name'],
            'description' => $validated['description'] ?? null,
            'cover_image' => $coverImagePath,
        ]);

        return redirect()->route('admin.books.index')
            ->with('success', 'Book created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Not implemented
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        return Inertia::render('admin/books/edit', [
            'book' => $book
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'book_name' => 'required|string|max:255',
            'published_date' => 'required|date',
            'publisher_name' => 'required|string|max:255',
            'cover_image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'description' => 'nullable|string',
        ]);

        $coverImagePath = $book->cover_image;
        
        if ($request->hasFile('cover_image')) {
            if ($coverImagePath && Storage::disk('public')->exists($coverImagePath)) {
                Storage::disk('public')->delete($coverImagePath);
            }
            
            $file = $request->file('cover_image');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $coverImagePath = $file->storeAs('books', $filename, 'public');
        }

        $book->update([
            'book_name' => $validated['book_name'],
            'published_date' => $validated['published_date'],
            'publisher_name' => $validated['publisher_name'],
            'description' => $validated['description'] ?? null,
            'cover_image' => $coverImagePath,
        ]);

        return redirect()->route('admin.books.index')
            ->with('success', 'Book updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        if ($book->cover_image && Storage::disk('public')->exists($book->cover_image)) {
            Storage::disk('public')->delete($book->cover_image);
        }

        $book->delete();

        return redirect()->route('admin.books.index')
            ->with('success', 'Book deleted successfully.');
    }
}
