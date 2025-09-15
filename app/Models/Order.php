<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'status_id',
        'payment_id',
        'order_item_id',
        'order_no',
        'date',
        'total',
        'contact_id',
        'shipping_id',
        'user_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    /**
     * Points to the user that owns the Order
     * @return BelongsTo<User,Order>
     */

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
    /**
     * Point to Order Items of the current Order
     * @return HasMany<OrderItem,Order>
     */
    public function orderItems(): HasMany {
        return $this->hasMany(OrderItem::class);
    }
}
