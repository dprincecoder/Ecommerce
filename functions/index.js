const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
	"sk_test_51JbsfpEUQGIpi7rLbaZHzXRVG6sExkXFDeFUCgZU6AxhQcq4XtEcosO7hsCodaa8MskLTHjXcaccqFYA1iS2i3sS00OcsCrgj5"
);

const app = express();

app.use(
	cors({
		origin: true,
	})
);

app.use(express.json());

app.post("/payments/create", (req, res) => {
	try {
		const { amount, shipping } = req.body;
		const paymentIntent = stripe.paymentIntent.create({
			shipping,
			amount,
			currency: "usd",
		});

		res.send(paymentIntent.client_secret);
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, message: error.message });
	}
});

app.get("*", (req, res) => {
	res.status(404).send("404, Not Found");
});

exports.api = functions.https.onRequest(app);
