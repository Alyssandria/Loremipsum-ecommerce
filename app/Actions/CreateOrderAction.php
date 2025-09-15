<?php

namespace App\Actions;

use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Str;

class CreateOrderAction {
    /**
     * Syncs the state of completed paypal order with the Application
     * @param array<int,mixed> $data
     */
    public function execute(User $user, array $data): Order {

        $purchase_units = $data['purchase_units'][0];

        $orderItems = $purchase_units['items'];

        $ids = Str::of($purchase_units['custom_id'])
            ->explode(':')->all();

        $shipping_id = $ids[0];
        $contact_id = $ids[1];


        $order = $user->orders()->create([
            'order_no' => $data['id'],
            'total' => $purchase_units['amount']['value'],
            'shipping_id' => $shipping_id,
            'contact_id' => $contact_id
        ]);

        foreach ($orderItems as $key => $value) {
            $order->orderItems()->create([
                'product_id' => (int) $value['sku'],
                'quantity' => (int) $value['quantity'],
                'subtotal' => (int) $value['unit_amount']['value']
            ]);
        }

        return $order;
    }
}
