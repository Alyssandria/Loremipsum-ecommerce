<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Pool;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     *
     */
    public function index(Request $request)
    {
        return Inertia::render('carts/Carts');
    }
    /**
     * @return RedirectResponse
     */
    public function store(Request $request, int $productID)
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
