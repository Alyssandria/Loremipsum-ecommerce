<?php

use App\Http\Controllers\Products\CartController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Products\ShopController;

Route::get('/shop', [ShopController::class, 'index'])
    ->name('app.shop');

Route::middleware('auth')->group(function () {
    Route::get('carts/', [CartController::class,'index'])
        ->name('carts.index');
    Route::post('cart/{productID}', [CartController::class, 'store'])
        ->name('cart.add');
});
