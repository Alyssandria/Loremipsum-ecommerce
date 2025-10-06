<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\ProductService;
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
    public function showCompleted(Request $request, ProductService $product, string $orderID): RedirectResponse|Response {

        if(
            ($exist = $request->user()->orders()->where('order_no', $orderID)->first()) &&
            $exist->status_id == 1
        ){
            $orderItems = $exist->orderItems()->get();
            $productData = $product->getAllProducts($orderItems->map(function ($value) {
                return $value['product_id'];
            })->toArray());

            $items = $orderItems->map(function ($value) use ($productData){
                    $image = $productData[$value['product_id']]['thumbnail'];
                    return [
                        ...$value->toArray(),
                        "image" => $image
                    ];
            });



            return Inertia::render('orders/Order', [
                'order' => $exist,
                'orderItems' => $items
            ]);
        }

        $request->session()->flash('error', [
            'message' => "Invalid order number or order not payed"
        ]);

        return redirect()->route('order.index');
    }
}
