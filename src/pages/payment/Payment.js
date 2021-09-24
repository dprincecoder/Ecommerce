import React from 'react'
import PaymentDetails from '../../components/paymentDetails/PaymentDetails'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import {publishableKey} from '../../stripe/config'
const Payment = () => {

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);
    return (
        <Elements stripe={stripePromise}>
            <PaymentDetails />
        </Elements>
    )
}

export default Payment
