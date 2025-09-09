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

    public function handlePayment (Request $request) {
        $user = $request->user();
        $ids = $request->query('ids');

        if (!$ids) {
            return redirect()->route('checkout.show');
        }


        if(!$request->input('contact_id')){
            $validated = $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'phone' => 'required|numeric|max_digits:11',
                'email' => 'required|email',
            ]);

            $user->contacts()->create($validated);
        }

        if(!$request->input('shipping_id')){
            $validated = $request->validate([
                'street' => 'required|string|max:255',
                'country' => 'required|string|max:255',
                'city' => 'required|string|max:255',
                'state' => 'required|string|max:255',
                'zip' => 'required|numeric|digits:4',
            ]);

            $user->shippings()->create($validated);
        }

        return $this->paypalClient->makePayment($request->user(), $ids);
    }

    public function paypalReturn (Request $request, PaypalService $paypal) {
        $orderID = $request->query("token");


        $capture = $this->paypalClient->captureOrder($orderID);

        if (
            (array_key_exists('details', $capture) && $capture['details'][0]['issue'] == 'ORDER_ALREADY_CAPTURED')
            || ($capture['status'] == "COMPLETED")
        ) {
            $order = $this->paypalClient->getOrder($orderID);

            // REFLECT SUCCESSFULL TRANSACTION TO THE APP STATE
            dd($order);
        }

        // HANDLE ERRORS
    }
}
