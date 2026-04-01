<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BookReview;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BookReviewController extends Controller
{
    public function index()
    {
        $reviews = BookReview::with('book')->latest()->paginate(10);
        return Inertia::render('admin/book-reviews/index', [
            'reviews' => $reviews
        ]);
    }

    public function create()
    {
        $books = Book::select('id', 'book_name')->orderBy('book_name')->get();
        return Inertia::render('admin/book-reviews/create', [
            'books' => $books
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id',
            'title' => 'required|string|max:255',
            'magazine_name' => 'required|string|max:255',
            'date' => 'required|date',
            'path' => 'nullable|file|mimes:pdf,jpeg,png,jpg,webp|max:10240',
        ]);

        $path = null;
        if ($request->hasFile('path')) {
            $file = $request->file('path');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('reviews', $filename, 'public');
        }

        BookReview::create([
            'book_id' => $validated['book_id'],
            'title' => $validated['title'],
            'magazine_name' => $validated['magazine_name'],
            'date' => $validated['date'],
            'path' => $path,
        ]);

        return redirect()->route('admin.book-reviews.index')
            ->with('success', 'Book review added successfully.');
    }

    public function show(string $id)
    {
        // Unused
    }

    public function edit(BookReview $bookReview)
    {
        $books = Book::select('id', 'book_name')->orderBy('book_name')->get();
        return Inertia::render('admin/book-reviews/edit', [
            'review' => $bookReview,
            'books' => $books
        ]);
    }

    public function update(Request $request, BookReview $bookReview)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id',
            'title' => 'required|string|max:255',
            'magazine_name' => 'required|string|max:255',
            'date' => 'required|date',
            'path' => 'nullable|file|mimes:pdf,jpeg,png,jpg,webp|max:10240',
        ]);

        $filePath = $bookReview->path;
        
        if ($request->hasFile('path')) {
            if ($filePath && Storage::disk('public')->exists($filePath)) {
                Storage::disk('public')->delete($filePath);
            }
            
            $file = $request->file('path');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('reviews', $filename, 'public');
        }

        $bookReview->update([
            'book_id' => $validated['book_id'],
            'title' => $validated['title'],
            'magazine_name' => $validated['magazine_name'],
            'date' => $validated['date'],
            'path' => $filePath,
        ]);

        return redirect()->route('admin.book-reviews.index')
            ->with('success', 'Book review updated successfully.');
    }

    public function destroy(BookReview $bookReview)
    {
        if ($bookReview->path && Storage::disk('public')->exists($bookReview->path)) {
            Storage::disk('public')->delete($bookReview->path);
        }

        $bookReview->delete();

        return redirect()->route('admin.book-reviews.index')
            ->with('success', 'Book review deleted successfully.');
    }
}
