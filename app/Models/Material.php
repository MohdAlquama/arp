<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = [
        'material_name',
        'material_code',
        'description',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean', // Ensures React receives a true/false boolean, not 1/0
    ];
}
