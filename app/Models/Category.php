<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Category extends Model
{
    protected $appends = ['banner_image_url'];

    protected $fillable = [
        'name',
        'show_in_header',
        'ui_id',
        'status',
        'page_title',
        'page_description',
        'banner_image',
    ];

    protected $casts = [
        'show_in_header' => 'boolean',
        'status' => 'string',
    ];

    public function getBannerImageUrlAttribute(): ?string
    {
        return $this->banner_image
            ? Storage::disk('public')->url($this->banner_image)
            : null;
    }

    public function subCategories(): HasMany
    {
        return $this->hasMany(SubCategory::class, 'category_id');
    }
}
