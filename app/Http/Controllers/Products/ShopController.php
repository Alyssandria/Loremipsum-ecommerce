<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class ShopController extends Controller
{
    /**
     * @return Response
     */
    public function index()
    {
        $response = Http::get(env('PRODUCTS_API_BASE'))->json()['products'];
        return Inertia::render('shop/Layout', compact('response'));
    }
    public function show(string $productID): Response
    {
        $product = Http::get(env('PRODUCTS_API_BASE') . '/' . $productID)->json();
        return Inertia::render('shop/Product', compact('product'));
    }

    public function checkout(Request $request) {}
}
