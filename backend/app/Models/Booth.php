<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booth extends Model
{
    protected $fillable = [
        'name',
        'poster',
        'video'
    ];
}