// const stripe = require("stripe")(
//   "sk_test_51MOh6VJkUoTpRNdsMaJWxhSZ389yh8uaBoAe1iT0tFM9nJ4DtzfJBYQ9C7VICX52cLfZlCRlhDPZuAv55UkWZ0lf00O9iDTYO3"
// );
const stripe = require("stripe")(
  "sk_test_51HWzMUHuAksKvus5CNmr1b9q7zmCV0JGOm3s2BWCs2KDaBEyDKHX4ylQd3U8buj3sq5PeobvhvWxTKvCzfIr9eTe005ZOyocfb");

async function createCheckoutSession(req, res, next) {
  let line_items = req.cart.map((item) => {
    let imageUrl = `${process.env.BASE_URL}/products/${item._id}/image`;
    return {
      quantity: item.qty,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
          description: item.description,
          images: [imageUrl],
        },
      },
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.BASE_URL_FRONTEND}/success`,
      cancel_url: `${process.env.BASE_URL_FRONTEND}/`, //redirect user to main page
      metadata: {
        userId: req.user._id,
      },
    });

    res.status(200).json(session.url);
  } catch (error) {
    next(error);
  }
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
      const userId = paymentIntent.metadata.userId; // store order in the db
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
