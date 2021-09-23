import React, { useEffect, useState } from "react";
import "./paymentDetails.scss";
import FormInput from "../forms/formInput/FormInput";
import { CountryDropdown } from "react-country-region-selector";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "../forms/button/Button";
import { apiInstance } from '../../Utils/index';
import { createStructuredSelector } from "reselect";
import {selectCartTotal, selectCartItemsCount, selectCartItems} from '../../redux/cart/cart.selectors'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveOrderHistory } from "../../redux/orders/orders.action";

const initialAddressState = {
	line1: "",
	line2: "",
	city: "",
	state: "",
	postal_code: "",
	country: "",
};

const mapState = createStructuredSelector({
	total: selectCartTotal,
	itemCount: selectCartItemsCount,
	cartItems: selectCartItems
})
const PaymentDetails = () => {
	const { total, itemCount, cartItems } = useSelector(mapState);
	const elements = useElements();
	const stripe = useStripe();
	const dispatch = useDispatch();
	const history = useHistory();
	const [billingAddress, setBillingAddress] = useState({
		...initialAddressState,
	});
	const [shippingAddress, setShippingAddress] = useState({
		...initialAddressState,
	});
	const [recipientName, setRecipientName] = useState("");
	const [nameOnCard, setNameOnCard] = useState("");

	useEffect(() => {
		if (itemCount < 1) {
			history.push('/');

		}
	}, [itemCount])
	const handleShipping = (evt) => {
		const { name, value } = evt.target;
		setShippingAddress({
			...shippingAddress,
			[name]: value,
		});
	};

	const handleBilling = (e) => {
		const { name, value } = e.target;
		setBillingAddress({
			...billingAddress,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const cardElement = elements.getElement("card");

		if (
			!shippingAddress.line1 ||
			!shippingAddress.city ||
			!shippingAddress.state ||
			!shippingAddress.postal_code ||
			!shippingAddress.country ||
			!billingAddress.line1 ||
			!billingAddress.city ||
			!billingAddress.state ||
			!billingAddress.postal_code ||
			!billingAddress.country ||
			!recipientName || !nameOnCard
		) {
			return;
		}

		apiInstance.post('/payments/create', {
			amount: total * 100,
			shipping: {
				name: recipientName,
				address: {
					...shippingAddress,
				}
			}
		}).then(({ data: clientSecret }) => {
			stripe.createPaymentMethod({
				type: "card",
				card: cardElement,
				billing_details: {
					name: nameOnCard,
					address: {
						...billingAddress
					}
				}
			}).then(({ paymentMethod }) => {
				stripe.confirmCardPayment(clientSecret, {
					payment_method: paymentMethod.id
				}).then(({ paymentIntent }) => {
					console.log(paymentIntent);
					const configOrder = {
						orderTotal: total,
						orderItems: cartItems.map(item => {
							const { documentID, productThumbnail, productName, productPrice, quantity } = item;

							return {
								documentID,
								productThumbnail,
								productName,
								productPrice,
								quantity,
							};
						})
					} 

					dispatch(saveOrderHistory(configOrder));
				})
			})
		})
	};

	const configCardElement = {
		iconStyle: "solid",
		style: {
			base: {
				fontSize: "16px",
			},
		},
		hidePostalCode: true,
	};
	return (
		<div className="paymentDetails">
			<form onSubmit={handleSubmit}>
				<div className="group">
					<h1>Shipping Address</h1>
					<FormInput
						required
						type="test"
						name="recipientName"
						placeholder="Recipient Name"
						value={recipientName}
						handleChange={(e) => setRecipientName(e.target.value)}
					/>
					<FormInput
						required
						type="test"
						name="line1"
						placeholder="Line 1"
						value={shippingAddress.line1}
						handleChange={(evt) => handleShipping(evt)}
					/>{" "}
					<FormInput
						type="test"
						name="line2"
						placeholder="Line 2"
						value={shippingAddress.line2}
						handleChange={(evt) => handleShipping(evt)}
					/>{" "}
					<FormInput
						required
						type="test"
						name="city"
						placeholder="City"
						value={shippingAddress.city}
						handleChange={(evt) => handleShipping(evt)}
					/>{" "}
					<FormInput
						required
						type="test"
						name="state"
						placeholder="State"
						value={shippingAddress.state}
						handleChange={(evt) => handleShipping(evt)}
					/>{" "}
					<FormInput
						required
						type="test"
						name="postal_code"
						placeholder="Postal Code"
						value={shippingAddress.postal_code}
						handleChange={(evt) => handleShipping(evt)}
					/>{" "}
					<div className="formRow checkoutInput">
						<CountryDropdown
							required
							onChange={(val) =>
								handleShipping({
									target: {
										name: "country",
										value: val,
									},
								})
							}
							valueType="short"
							value={shippingAddress.country}
						/>
					</div>
				</div>
				<div className="group">
					<h1>Billing Address</h1>
					<FormInput
						required
						type="test"
						name="nameOnCard"
						placeholder="Name on Card"
						value={nameOnCard}
						handleChange={(e) => setNameOnCard(e.target.value)}
					/>
					<FormInput
						type="test"
						name="line1"
						placeholder="Line 1"
						value={billingAddress.line1}
						handleChange={(e) => handleBilling(e)}
					/>{" "}
					<FormInput
						type="test"
						name="line2"
						placeholder="Line 2"
						value={billingAddress.line2}
						handleChange={(e) => handleBilling(e)}
					/>{" "}
					<FormInput
						required
						type="test"
						name="city"
						placeholder="City"
						value={billingAddress.city}
						handleChange={(e) => handleBilling(e)}
					/>{" "}
					<FormInput
						required
						type="test"
						name="state"
						placeholder="State"
						value={billingAddress.state}
						handleChange={(e) => handleBilling(e)}
					/>{" "}
					<FormInput
						required
						type="test"
						name="postal_code"
						placeholder="Postal Code"
						value={billingAddress.postal_code}
						handleChange={(e) => handleBilling(e)}
					/>{" "}
					<div className="formRow checkoutInput">
						<CountryDropdown
							required
							onChange={(val) =>
								handleBilling({
									target: {
										name: "country",
										value: val,
									},
								})
							}
							valueType="short"
							value={billingAddress.country}
						/>
					</div>
				</div>
				<div className="group">
					<h1>Card Details</h1>
					<CardElement options={configCardElement} />

					<div className="">
						<br />
					</div>
				</div>
				<Button type="submit" > Pay Now </Button>
			</form>
		</div>
	);
};

export default PaymentDetails;
