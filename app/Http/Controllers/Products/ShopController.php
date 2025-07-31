<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $response = Http::get(env('PRODUCTS_API_BASE'))->json()['products'];

        return Inertia::render('shop/Layout', compact('response'));
    }
}
