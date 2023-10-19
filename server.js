require("dotenv").config();
const errorMiddleware = require("./middlewares/errorMiddleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const connectToDB = require("./connectToDB");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const path = require("path");
const cors = require("cors");
// mongoDB connection
connectToDB(process.env.MONGO_URL, function () {
  app.listen(process.env.PORT, function () {
    console.log("Server is running");
  });
});

// thir party middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./upload")));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://checkout.stripe.com",
      "https://ecommerce-mern-production-73b6.up.railway.app/",
    ],
    methods: ["GET", "POST", "PUT"],
  })
);

// require custom routes
const productRouter = require("./routes/product.routes");
const stripeRouter = require("./routes/stripe.routes");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const orderRouter = require("./routes/order.routes");

// use require custom routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/stripe", stripeRouter);
app.use("/api/v1/users", userRouter);
app.use("/auth/v1", authRouter);
app.use("/orders/v1", orderRouter);

// not found middleware
const indexRouter = express.Router().get("/", function (req, res) {
  res.send("api is running");
});
if (process.env.NODE_ENV === "development") {
  app.use("/", indexRouter);
} else {
  console.log("exec");

  app.use(express.static(path.join(__dirname, "./frontend/dist")));
  app.get("*", function (req, res) {
    console.log("exec passed");
    res.sendFile(path.resolve(__dirname, "./frontend/dist/index.html"));
  });
}
app.use(notFoundMiddleware);
// error middlware
app.use(errorMiddleware);
