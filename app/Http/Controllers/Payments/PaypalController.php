<?php

namespace App\Http\Controllers\Payments;

use App\Actions\CreateOrderAction;
use App\Http\Controllers\Controller;
use App\Services\PaypalService;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

        return $this->paypalClient->makePayment($request->user(), [
            'items' => $ids,
            'contact_id' => $request->input('contact_id'),
            'shipping_id' => $request->input('shipping_id'),
        ]);
    }

    public function paypalReturn (Request $request, PaypalService $paypal, CreateOrderAction $saveOrder) {
        $orderID = $request->query("token");

        $capture = $this->paypalClient->captureOrder($orderID);

        // CHECK IF ORDER IS CONFIRMED
        if(
            !(array_key_exists('status', $capture) && $capture['status'] == 'COMPLETED') &&
            !(array_key_exists('details', $capture) && $capture['details'][0]['issue'] == 'ORDER_ALREADY_CAPTURED')
        ){
            $request->session()->flash('error', [
                'message' => 'Something went wrong on the order',
            ]);
        }

        // SAVE STATE TO DB
        $saveOrder->execute($request->user(), $this->paypalClient->getOrder($orderID));

        return redirect()->route('order.completed', ['orderID' => $orderID]);

    }
}
