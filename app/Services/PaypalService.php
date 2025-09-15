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



    protected function createOrder (User $user, Array $data): mixed {
        $productService = new ProductService();
        $products = $productService->getAllProducts($data['items']);
        $cartItems = $user->cart()->first()->cartItem()->get();
        $shipping = $user->shippings()->where('id', $data['shipping_id'])->first();
        $contact = $user->contacts()->where('id', $data['contact_id'])->first();

        $total = 0;

        $products = collect($products)->map(function (array $item, $key) use ($cartItems, $total, $shipping, $contact) {
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
                            'return_url' => route('paypal.return', ['provider' => 'paypal', 'contact' => $contact->id, 'shpping' => $shipping->id]),
                            'cancel_url' => route('carts.index')
                        ]
                    ]
                ],
                'purchase_units' => [
                    [
                        'custom_id' => "{$shipping->id}:{$contact->id}",
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
                                "address_line_1"=> $shipping->street,
                                "admin_area_1"=> $shipping->city,
                                "admin_area_2"=> $shipping->state,
                                "postal_code"=> $shipping->zip,
                                "country_code"=> "PH"
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

    public function makePayment (User $user, Array $data): Response
    {
        $order = $this->createOrder($user, $data);

        foreach($order['links'] as $link) {
            if($link['rel'] == 'payer-action') {
                return Inertia::location($link['href']);
            }
        }
    }
}
