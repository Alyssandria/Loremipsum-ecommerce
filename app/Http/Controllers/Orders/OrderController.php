<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    //
    public function index(Request $request) {
        $orderWithItems = $request->user()->orders()->get()->map(function (Order $value) {
            $item = $value->orderItems()->get();

            return [...$value->toArray(), 'orderItems' => $item];
        });

        return Inertia::render('orders/Index', [
            'orders' => $orderWithItems
        ]);
    }
    public function showCompleted(Request $request, string $orderID): RedirectResponse|Response {

        if(
            ($exist = $request->user()->orders()->where('order_no', $orderID)->first()) &&
            $exist->status_id == 1
        ){
            $orderItems = $exist->orderItems()->get();
            return Inertia::render('orders/Order', [
                'order' => $exist,
                'orderItems' => $orderItems
            ]);
        }

        $request->session()->flash('error', [
            'message' => "Invalid order number or order not payed"
        ]);

        return redirect()->route('order.index');
    }
}
