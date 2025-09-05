<?php

namespace App\Http\Controllers\Json;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Gets all cart items and returns a JsonResponse
     * @return JsonResponse
     */
    public function index (Request $request, ProductService $products) {
        return $products->getAllCartItems($request->user());
    }
}
