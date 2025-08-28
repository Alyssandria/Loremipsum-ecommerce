<?php

use App\Http\Controllers\Payments\PaypalController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')
    ->controller(PaypalController::class)->group(function () {
        Route::get('payments/return/{provider}', 'paypalReturn')
            ->name('paypal.return');

});
