<?php

use App\Http\Controllers\Orders\OrderController;
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

Route::controller(OrderController::class)
    ->middleware('auth')
    ->group(function () {
        Route::get('order/c/{orderID}', 'showCompleted')
            ->name('order.completed');

        Route::get('orders', 'index')
            ->name('order.index');
    });

Route::controller(CartController::class)
    ->middleware('auth')
    ->group(function () {
        Route::get('/carts', 'index')
            ->name('carts.index');
        Route::post('/cart/{productID}', 'store')
            ->name('cart.add');
        Route::post('/cart/update/{productID}', 'update')
            ->name('cart.update');
        Route::delete('/cart/delete/{productID}','delete')
            ->name('cart.delete');
    });
