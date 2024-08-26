require("dotenv").config();
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");

// const dotenv=require('dotenv');
const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();
const cors = require("cors");
const { Message } = require("firebase-functions/v1/pubsub");
const { setGlobalOptions } = require("firebase-functions/v2");
setGlobalOptions({ maxInstances: 10 });
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    Message: "sccess!",
  });
});
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    const paymentintent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).json({ clientSecret: paymentintent.client_secret });
  } else {
    res.status(404).json({ message: "total must be greater than 0" });
  }
});

exports.api = onRequest(app);

