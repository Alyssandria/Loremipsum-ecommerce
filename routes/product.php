<?php

use App\Http\Controllers\Products\CartController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Products\ShopController;

Route::get('/products', [ShopController::class, 'index'])
    ->name('product.index');

Route::get('/product/{productID}', [ShopController::class, 'show'])
    ->name('product.show');

Route::post('/checkout', [ShopController::class, 'checkout'])
    ->name('product.checkout');

Route::middleware('auth')->group(function () {
    Route::get('/carts', [CartController::class, 'index'])
        ->name('carts.index');

    Route::get('/checkout/{productID}', [ShopController::class, 'singleCheckoutIndex'])
        ->name('checkout.show');

    Route::post('/cart/{productID}', [CartController::class, 'store'])
        ->name('cart.add');
});
