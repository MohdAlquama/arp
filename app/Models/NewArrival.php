<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class NewArrival extends Model
{
    protected $fillable = [
        'name',
        'category_label',
        'image_path',
        'hover_image_path',
        'price',
        'old_price',
        'badge',
        'href',
        'sort_order',
        'status',
    ];

    protected $casts = [
        'price'      => 'decimal:2',
        'old_price'  => 'decimal:2',
        'status'     => 'boolean',
        'sort_order' => 'integer',
    ];

    protected $appends = ['image_url', 'hover_image_url', 'discount_percent'];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image_path
            ? Storage::disk('public')->url($this->image_path)
            : null;
    }

    public function getHoverImageUrlAttribute(): ?string
    {
        return $this->hover_image_path
            ? Storage::disk('public')->url($this->hover_image_path)
            : null;
    }

    public function getDiscountPercentAttribute(): ?int
    {
        if (! $this->old_price || (float) $this->old_price <= (float) $this->price) {
            return null;
        }

        return (int) round((1 - ((float) $this->price / (float) $this->old_price)) * 100);
    }

    public function scopeActive($query)
    {
        return $query->where('status', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderByDesc('id');
    }
}
