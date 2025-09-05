<?php

use App\Http\Controllers\Json\CartController;
use Illuminate\Support\Facades\Route;

Route::prefix('json')->group(function () {

    Route::get('/carts', [CartController::class, 'index'])
        ->middleware('auth')
        ->name('carts.json');
});
