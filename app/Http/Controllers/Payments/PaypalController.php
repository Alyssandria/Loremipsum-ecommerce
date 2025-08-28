<?php

namespace App\Http\Controllers\Payments;

use App\Http\Controllers\Controller;
use App\Services\PaypalService;
use Illuminate\Http\Request;

class PaypalController extends Controller
{
    protected PaypalService $paypalClient;

    public function __construct(PaypalService $paypal)
    {
        $this->paypalClient = $paypal;
    }

    public function paypalReturn (Request $request, PaypalService $paypal) {
        $orderID = $request->query("token");

        $capture = $paypal->captureOrder($orderID);


        if ($capture['status'] === 'completed') {
            // COMPLETED
            # code...
        }

        // HANDLE ERRORS
    }
}
