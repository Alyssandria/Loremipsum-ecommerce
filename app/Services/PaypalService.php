<?php

namespace App\Services;
use App\Models\User;
use Inertia\Inertia;
use PaypalServerSdkLib\Authentication\ClientCredentialsAuthCredentialsBuilder;
use PaypalServerSdkLib\Environment;
use PaypalServerSdkLib\PaypalServerSdkClient;
use PaypalServerSdkLib\PaypalServerSdkClientBuilder;
use Symfony\Component\HttpFoundation\Response;


class PaypalService {

    public   PaypalServerSdkClient $paypalClient;

    // Initialize Paypal configs
    public function __construct()
    {
        $this->paypalClient = PaypalServerSdkClientBuilder::init()
             ->clientCredentialsAuthCredentials(
                 ClientCredentialsAuthCredentialsBuilder::init(
                     config('paypal.sandbox.client_id'),
                     config('paypal.sandbox.client_secret')
                 )
             )
             ->environment(Environment::SANDBOX)
             ->build();
    }



    protected function createOrder (User $user, Array $ids): mixed {
        $productService = new ProductService();
        $products = $productService->getAllProducts($ids);
        $cartItems = $user->cart()->first()->cartItem()->get();
        $total = 0;

        $products = collect($products)->map(function (array $item, $key) use ($cartItems, $total) {
            $cartItem = $cartItems->where('product_id', $key)->first();

            return [
                "name"=> $item['title'],
                "description"=> $item['description'],
                "unit_amount"=> [
                    "currency_code"=> "PHP",
                    "value"=> $item['price']
                ],
                "category"=> "PHYSICAL_GOODS",
                "sku"=> $item['id'],
                "url"=> route('product.show', $item['id']),
                'quantity' => $cartItem->quantity
            ];
        })->values()->all();

        foreach($products as $key => $value){
            $total += $value['unit_amount']['value'] * $value['quantity'];
        }

        $orderBody = [
            'body' => [
                'intent' => 'CAPTURE',
                'payment_source' => [
                    'paypal' => [
                        'experience_context' => [
                            "user_action" => "PAY_NOW",
                            'return_url' => route('paypal.return', 'paypal'),
                            'cancel_url' => route('carts.index')
                        ]
                    ]
                ],
                'purchase_units' => [
                    [
                        'amount' => [
                            'currency_code' => 'PHP',
                            'value' => number_format((float) $total, 2, '.', ''),
                            'breakdown' => [
                                'item_total' => [
                                    'currency_code' => 'PHP',
                                    'value' => number_format((float) $total, 2, '.', ''),
                                ]
                            ]
                        ],
                        "shipping"=> [
                            "address"=> [
                                "address_line_1"=> "2211 N First Street",
                                "address_line_2"=> "Building 17",
                                "admin_area_2"=> "San Jose",
                                "admin_area_1"=> "CA",
                                "postal_code"=> "95131",
                                "country_code"=> "US"
                            ]
                        ],
                        "items" => $products
                    ]
                ],
            ],
        ];

        return json_decode($this->
            paypalClient
                ->getOrdersController()
                ->createOrder($orderBody)->getBody(), true);
    }

    public function captureOrder(string $orderId) {
        $captureBody = [
            'id' => $orderId,
            'body' => (object) []
        ];

        return json_decode(
            $this->
            paypalClient
                ->getOrdersController()
                ->captureOrder($captureBody)
                ->getBody(),
            true);
    }

    public function getOrder(string $orderId) {
        $body = [
            'id' => $orderId,
            'body' => (object) []
        ];
        return json_decode(
            $this->
            paypalClient
                ->getOrdersController()
                ->getOrder($body)
                ->getBody(),
            true);
    }

    public function makePayment (User $user, Array $productIds): Response
    {
        $order = $this->createOrder($user, $productIds);

        foreach($order['links'] as $link) {
            if($link['rel'] == 'payer-action') {
                return Inertia::location($link['href']);
            }
        }
    }
}
