<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CartController extends Controller
{
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
