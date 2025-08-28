<?php

namespace App\Services;
use App\Models\CartItem;
use Inertia\Inertia;
use PaypalServerSdkLib\Authentication\ClientCredentialsAuthCredentialsBuilder;
use PaypalServerSdkLib\Environment;
use PaypalServerSdkLib\PaypalServerSdkClient;
use PaypalServerSdkLib\PaypalServerSdkClientBuilder;
use Symfony\Component\HttpFoundation\Response;


class PaypalService {

    protected PaypalServerSdkClient $paypalClient;

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

    protected function createOrder (CartItem $cartItem): mixed {
        $productService = new ProductService();

        $product = $productService->getProduct($cartItem->product_id);

        $total = ($cartItem->quantity * $product['price']);

        $orderBody = [
            'body' => [
                'intent' => 'CAPTURE',
                'payment_source' => [
                    'paypal' => [
                        'experience_context' => [
                            "user_action" => "PAY_NOW",
                            'return_url' => route('paypal.return', 'paypal'),
                            'cancel_url' => route('home')
                        ]
                    ]
                ],
                'purchase_units' => [
                    [
                        'amount' => [
                            'currency_code' => 'PHP',
                            'value' => number_format((float) $total, 2, '.', ''),
                        ],
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

    public function makePayment (CartItem $cartItem): Response
    {
        foreach($this->createOrder($cartItem)['links'] as $link) {
            if($link['rel'] == 'payer-action') {
                return Inertia::location($link['href']);
            }
        }

        // HANDLE ERRORS
    }
}
