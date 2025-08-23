<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;
use function Laravel\Prompts\info;

class ShopController extends Controller
{
    /**
     * @return Response
     */
    public function singleCheckoutIndex(int $productID)
    {
        $products = Http::get(env('PRODUCTS_API_BASE') . '/' . $productID)->json();
        return Inertia::render('payment/Checkout', compact('products'));
    }

    /**
     * @return Response
     */

    public function index(Request $request)
    {
        // SUBJECT FOR REFACTORING
        $categories = Http::get(env('PRODUCTS_API_BASE') . '/category-list');
        $query = $request->query("category");
        $sort = $request->query("sort") ? $request->query("sort") : "asc";
        $order = $request->query("order") ? $request->query("order") : "title";

        $responseData = [
            'sort' => $sort == "asc" || $sort == "desc" ? $sort : "asc",
            'order' => $order
        ];

        if ($categories->successful()) {
            $responseData['categoryList'] = $categories->json();
        }

        if ($query) {
            $products = Http::get(env('PRODUCTS_API_BASE') . '/category/' . $query);
            if($products->successful()) {
                $responseData['products'] = $products->json()['products'];
            }
        } else {
            $products = Http::get(env('PRODUCTS_API_BASE'));
            if($products->successful()) {
                $responseData['products'] = $products->json()['products'];
            }
        }

        switch ($sort) {
            case 'asc':
                $responseData['products'] = collect($responseData['products'])->sortBy($order)->values()->all();
                break;
            case 'desc':
                $responseData['products'] = collect($responseData['products'])->sortByDesc($order)->values()->all();
                break;
        }

        $responseData['currentCategory'] = $query ? $query : "all";

        return Inertia::render('shop/Layout', $responseData);
    }

    public function show(string $productID): Response
    {
        $product = Http::get(env('PRODUCTS_API_BASE') . '/' . $productID)->json();
        return Inertia::render('shop/Product', compact('product'));
    }
}
