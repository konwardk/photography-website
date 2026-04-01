<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'book_name',
        'published_date',
        'publisher_name',
        'cover_image',
        'description',
    ];

    public function reviews()
    {
        return $this->hasMany(BookReview::class);
    }
}
