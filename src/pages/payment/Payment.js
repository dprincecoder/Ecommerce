import React from 'react'
import PaymentDetails from '../../components/paymentDetails/PaymentDetails'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {publishableKey} from '../../stripe/config'
const Payment = () => {

    const stripePromise = loadStripe(publishableKey)
    return (
        <Elements stripe={stripePromise}>
            <PaymentDetails />
        </Elements>
    )
}

export default Payment
