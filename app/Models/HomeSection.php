<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class HomeSection extends Model
{
    protected $fillable = [
        'subtitle',
        'title',
        'highlight',
        'description',
        'image_path',
        'has_button',
        'button_text',
        'button_link',
        'sort_order',
        'status',
    ];

    protected $casts = [
        'has_button' => 'boolean',
        'status'     => 'boolean',
        'sort_order' => 'integer',
    ];

    // Automatically append 'image_url' when sending to Inertia / API
    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image_path
            ? Storage::disk('public')->url($this->image_path)
            : null;
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