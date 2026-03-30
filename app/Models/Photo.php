<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Photo extends Model
{
    protected $fillable = [
        'category_id',
        'path',
        'is_favourite',
        'is_carousal'
    ];

    protected $casts = [
        'is_favourite' => 'boolean',
        'is_carousal' => 'boolean'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(PhotoCategory::class, 'category_id');
    }
}
