<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    protected $fillable = [
        'variant_id',
        'mrp',
        'image',
        'display_name',
        'color_display',
        'is_promotional',
        'is_published',
        'is_variant_table_visible',
        'description',
        'is_description_visible',
    ];

    protected $casts = [
        'is_promotional' => 'boolean',
        'is_published' => 'boolean',
        'is_variant_table_visible' => 'boolean',
        'is_description_visible' => 'boolean',
        'mrp' => 'decimal:2',
    ];

    protected $appends = ['image_url'];

    public function variant(): BelongsTo
    {
        return $this->belongsTo(Variant::class);
    }

    public function variations(): HasMany
    {
        return $this->hasMany(ProductVariation::class);
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image
            ? Storage::disk('public')->url($this->image)
            : null;
    }
}
