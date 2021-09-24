const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const app = express();

app.use(cors({
	origin: true,
}));

app.use(express.json());

app.post("/payments/create", async (req, res) => {
	try {
		const { amount, shipping } = req.body;
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			shipping,
			currency: "usd",
		});

		res.status(200).send(paymentIntent.client_secret);
	} catch (error) {
		console.log(error);
		res.status(error.status).json({ statusCode: error.code, message: error.message });
	}
});

app.get("*", (req, res) => {
	res.status(404).send("404, Not Found");
});

exports.api = functions.https.onRequest(app);
