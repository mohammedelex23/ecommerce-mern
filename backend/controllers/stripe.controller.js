const stripe = require("stripe")(
  "sk_test_51MOh6VJkUoTpRNdsMaJWxhSZ389yh8uaBoAe1iT0tFM9nJ4DtzfJBYQ9C7VICX52cLfZlCRlhDPZuAv55UkWZ0lf00O9iDTYO3"
);
const YOUR_DOMAIN = "http://localhost:3000";

const urls = {
  "63c59e173a839424227be701": "https://i.ibb.co/KDS59Sr/jacket-1.png",
  "63c59e173a839424227be702": "https://i.ibb.co/CJX6ktH/jacket-3.png",
  "63b9ac2790451647fee916b4": "https://i.ibb.co/CJX6ktH/jacket-3.png",
};

async function createCheckoutSession(req, res) {
  let line_items = req.cart.map((item) => {
    return {
      quantity: item.qty,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
          description: item.description,
          images: [urls[item._id]],
        },
      },
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/`, //redirect user to main page
  });

  res.status(200).json(session.url);
}
const webhook = async function (request, response) {
  const event = request.body;

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      // we can use it to cancel a payment
      console.log("paymentIntent", paymentIntent);

      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      // console.log(paymentMethod);

      break;
    case "checkout.session.async_payment_succeeded":
      const paymentComple = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      // console.log(paymentComple);

      break;
    case "checkout.session.completed":
      const session = event.data.object;

      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items"],
        }
      );
      const lineItems = sessionWithLineItems.line_items;
      // console.log("payment_success", lineItems, session.id);

      break;
    // ... handle other event types
    default:
    // console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
};
module.exports = {
  createCheckoutSession,
  webhook,
};
