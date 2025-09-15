<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response {
    $categories = Http::get(env('PRODUCTS_API_BASE') . '/' . 'categories');
    $products = Http::get(env('PRODUCTS_API_BASE'), 'limit=10');


    if($products->successful() && $categories->successful()) {
        $categories = $categories->json();

        $products = $products->json()['products'];

        $categories = array_map(function ($el) {
                return [
                    'category' => $el,
                    'thumbnail' => Http::get($el['url'])->json()['products'][0]['thumbnail']
                ];
            },array_splice($categories, 0 , 3));

        return Inertia::render('home', [
            'categories' => $categories,
            'products' => $products
        ]);
    };

    }
}
