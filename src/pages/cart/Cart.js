import React from 'react'
import Checkout from '../../components/checkout/Checkout';

const Cart = () => {
    window.document.title = "Cart Items";
    return (
        <div>
            <Checkout/>
        </div>
    )
}

export default Cart;
