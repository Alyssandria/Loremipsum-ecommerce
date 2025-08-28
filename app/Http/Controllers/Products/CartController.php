<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Pool;

class CartController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        // POOLING
        $UserCartItems = $request->user()->cart()->first()->cartItem()->get();

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
