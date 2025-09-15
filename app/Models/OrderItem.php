<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    protected $fillable = [
        'product_id',
        'order_id',
        'quantity',
        'subtotal',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    /**
     * Points to the current Order of this item
     * @return BelongsTo<Order,OrderItem>
     */

    public function order(): BelongsTo {
        return $this->belongsTo(Order::class);
    }
}
