<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Services\CartService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     *
     */
    public function index(Request $request, CartService $cart)
    {
        $itemData = collect($cart->getItems($request->user()))->sortBy([
            fn (array $a, array $b) => $a['product']['title'] <=> $b['product']['title']
        ])->toArray();

        return Inertia::render('carts/Carts', [
            'items' => [...$itemData]
        ]);
    }

    public function delete(Request $request, CartService $cart, int $productID) {
        $items = collect($cart->deleteItem($request->user(), $productID))->sortBy([
            fn (array $a, array $b) => $a['product']['title'] <=> $b['product']['title']
        ])->toArray();

        return response()->json([
            'successfull' => true,
            'items' => [...$items]
        ]
        );
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

    public function update(Request $request, CartService $cartService, int $productID)
    {
        $cart = $request->user()->cart()->firstOrCreate([]);
        $quantity = $request->query('q');

        $cartItem = $cart->cartItem()->where('product_id', $productID)->first();

        if (!$cartItem){
            // RETURN SOME JSON RESPONS
            // HANDLE ERROR
            return response()->json([
                'message' => "Item not found",
                'id' => $productID
            ], 404);
        }

        if (!$quantity) {
            $cartItem->increment('quantity');
        } else {
            $cartItem->update(['quantity' => $quantity]);
        }

        return response()->json([
            'message' => "Quantity updated succesfully",
            'id' => $productID
        ]);
    }
}
