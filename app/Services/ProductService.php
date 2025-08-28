<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Http;

class ProductService {

    private string $BASEURL;

    public function __construct()
    {
        $this->BASEURL = config('product.base');
    }

    public function getProduct (int $productID): mixed {
        $request = Http::get($this->BASEURL . "/" .$productID);

        if($request->successful()) {
            return $request->json();
        }
    }

    public function getCartItem (User $user, int $productID)
    {
        return $user
            ->cart()
            ->first()
            ->cartItem()
            ->where('product_id', $productID)
            ->first();
    }

}
