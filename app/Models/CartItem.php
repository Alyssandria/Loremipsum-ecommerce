<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    protected $fillable = [
        'product_id',
        'quantity'
    ];

    public function Cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }
}
