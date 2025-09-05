<?php

use App\Http\Controllers\Products\CartController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Products\ShopController;

Route::controller(ShopController::class)->group(function () {
    Route::get('/products', 'index')
        ->name('product.index');
    Route::get('/product/{productID}','show')
        ->name('product.show');
    Route::get('/checkout', 'checkout')
        ->name('checkout.show')
        ->middleware('auth');
});


Route::middleware('auth')->group(function () {
    Route::get('/carts', [CartController::class, 'index'])
        ->name('carts.index');
    Route::post('/cart/{productID}', [CartController::class, 'store'])
        ->name('cart.add');
});
