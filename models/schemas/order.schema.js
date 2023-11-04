const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    orderDate: Date,
    orderStatus: String,
    paymentMethod: String,
    billingAddress: {
      country: String,
      state: String,
      city: String,
      zip: String,
    },
    items: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
