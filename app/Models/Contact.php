<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'email'
    ];

    /**
     * @return BelongsTo<User,Contact>
     */
    public function user():BelongsTo {
        return $this->belongsTo(User::class);

    }
}
