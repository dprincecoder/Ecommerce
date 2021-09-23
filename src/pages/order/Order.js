import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OrderDetails from '../../components/orderDetails/OrderDetails';
import { getOrderDetailsStart } from '../../redux/orders/orders.action';

const mapState = ({ ordersData }) => ({
    orderDetails: ordersData.orderDetails
})

const Order = () => {
    const { orderID } = useParams();
    const dispatch = useDispatch();
    const { orderDetails } = useSelector(mapState);
    const { orderTotal } = orderDetails;
    
    useEffect(() => {
        dispatch(getOrderDetailsStart(orderID))
    }, [])
    return (
        <div>
            <h1>Order ID: #{orderID}</h1>

            <OrderDetails order={orderDetails} />

            <h3>Total: {orderTotal}</h3>
        </div>
    )
}

export default Order;
