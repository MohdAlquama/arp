<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    use HasFactory;

    protected $fillable = [
        'article_no',
        'default_name',
        'category_id',
        'sub_category_id',
        'material_id',
        'color_ids',
        'size_ids',
        'status',
    ];

    protected $casts = [
        'color_ids' => 'array',
        'size_ids'  => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function material()
    {
        return $this->belongsTo(Material::class);
    }
}