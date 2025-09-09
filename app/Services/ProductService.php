<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Client\Pool;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class ProductService {

    private string $BASEURL;

    public function __construct()
    {
        $this->BASEURL = config('product.base') . "/";
    }

    public function getProduct (int $productID): mixed {
        $request = Http::get($this->BASEURL . $productID);

        if($request->successful()) {
            return $request->json();
        }
    }
    /**
     * Concurrently gets all products specified by *$ids* and returns it.
     * @param array<int> $ids
     * @return void
     */

    public function getAllProducts(array $ids) {
        $responses = Http::pool(function (Pool $pool) use ($ids){
            $requests = array_map(function ($n) {
                return $this->BASEURL .  $n;
            }, $ids);

            return array_map(function ($n) use ($pool) {
                return $pool->get($n);
            }, $requests);
        });


        $validated = collect($responses)->mapWithKeys(function ($item, $key) {
            if($item->ok()){
                $json = $item->json();
                return [$json['id'] => $json];
            }
        });

        return $validated->toArray();
    }
    /**
     * @return JsonResponse
     */
    public function getAllCartItems (User $user) {

        // POOLING
        $UserCartItems = $user->cart()->first()->cartItem()->get();

        $requests = Http::pool(function (Pool $pool) use ($UserCartItems) {
            $urls = $UserCartItems->map(function ($item) {
                return env('PRODUCTS_API_BASE') . '/' . $item['product_id'];
            })->toArray();

            return array_map(function ($url) use ($pool) {
                return $pool->get($url);
            }, $urls);
        });

        $response = collect($requests)->mapWithKeys(function ($request) {
            if (!$request->successful()) {
                return [
                    'error' => 'Unable to find product',
                    'status' => $request->status()
                ];
            }
            return [$request->json()['id'] => $request->json()];
        })->toArray();

        return response()->json([...$response]);
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
