const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
  'sk_test_EpUTVuIL1lxZltIdf9GtQt3700rmabf2Og'
);
const paypal = require('@paypal/checkout-server-sdk');

// PayPal configuration
const clientId = '';
const clientSecret = '';

// This is your test environment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

// Stripe payment intent route
router.post('/intents', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

// Create PayPal Order
router.post('/paypal/create-order', async (req, res) => {
  try {
    const request = new paypal.orders.OrdersCreateRequest();
    const total = req.body.amount / 100;

    request.requestBody({
      intent: "CAPTURE",
      application_context: {
        brand_name: "EggsXpress",
        locale: "en-US",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        shipping_preference: "NO_SHIPPING",
        return_url: `${req.protocol}://${req.get('host')}/success`,
        cancel_url: `${req.protocol}://${req.get('host')}/cancel`
      },
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total.toString()
          }
        }
      ]
    });

    const response = await client.execute(request);
    res.json({ orderId: response.result.id });
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({
      error: "Failed to create order.",
      details: error.message
    });
  }
});

// Capture payment
router.post('/paypal/capture-order', async (req, res) => {
  try {
    const orderID = req.body.orderId;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    const response = await client.execute(request);
    
    res.json({
      success: true,
      captureId: response.result.purchase_units[0].payments.captures[0].id
    });
  } catch (error) {
    console.error("Failed to capture order:", error);
    res.status(500).json({
      error: "Failed to capture order.",
      details: error.message
    });
  }
});

module.exports = router;