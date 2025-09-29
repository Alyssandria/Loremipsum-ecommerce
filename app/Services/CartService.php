<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\User;

class CartService {

    public function get(User $user) : Cart | null {
        return $user->cart()->first();
    }

    public function deleteItem(User $user, int $productID) {
        $item = $this->get($user)->cartItem()->where('product_id', $productID)->first();

        if (!$item) {
            // HANDLE ERROR
            dd($item);
        }

        $item->delete();

        return $this->getItems($user);
    }
    /**
     * Get all cart items including product data
     * @return array
     */
    public function getItems(User $user) : array {
        $productService = new ProductService();

        $cart = $this->get($user);

        if(!$cart){
            return [];
        }

        $items = $cart->cartItem()->get();

        $cartItems = $productService->getAllProducts(
            $items->map(function(CartItem $item){
                return $item->product_id;
            })->toArray()
        );

        return $items->mapWithKeys(function (CartItem $value, $key) use ($cartItems){
            return [
                $value->product_id =>
                [
                    'product' => [...$cartItems[$value->product_id]],
                    'quantity' => $value['quantity']
                ]
            ];
        })->toArray();
    }
}
