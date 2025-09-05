<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    protected $fillable = [
        'street',
        'country',
        'city',
        'state',
        'zip'
    ];
}
