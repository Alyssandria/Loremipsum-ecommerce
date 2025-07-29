<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function store(string $productID)
    {
        // GET CURRENT USER'S CART
        $user = Auth::user();
        $cart = $user->cart()->firstOrCreate([]);

        // ADD A CART ITEM IF PRODUCT IS NOT IN THE CART
        // INCREASE QUANTITY IF ALREADY IN THE CART

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
