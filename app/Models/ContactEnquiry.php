<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactEnquiry extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'email',
        'type',
        'subject',
        'message',
        'status',
        'ip_address',
        'user_agent',
    ];
}