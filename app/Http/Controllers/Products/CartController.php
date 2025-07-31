<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Pool;

class CartController extends Controller
{
    public function index(Request $request){
        $carts = $request->user()->cart()->first()->cartItems()->get()->all();
        $responses = collect($carts)->map(function ($item, $key) {
            return Http::pool(fn (Pool $pool) => $pool->get(env('PRODUCTS_API_BASE') . '/' . $item['product_id']));
        });

        return $responses;
    }
    public function store(Request $request, string $productID)
    {
        $user = $request->user();
        $cart = $user->cart()->firstOrCreate([]);

        if ($existing = $cart->cartItem()->where('product_id', $productID)->first()) {
            $existing->increment('quantity');
        } else {
            $cart->cartItem()->create([
                'product_id' => $productID,
                'quantity' => 1
            ]);
        }

        return redirect()->back();
    }
}
