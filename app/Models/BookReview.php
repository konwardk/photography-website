<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookReview extends Model
{
    protected $fillable = [
        'book_id',
        'title',
        'magazine_name',
        'date',
        'path',
    ];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
