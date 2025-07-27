<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Products\ShopController;

Route::get('/shop', [ShopController::class, 'index'])
    ->name('app.shop');