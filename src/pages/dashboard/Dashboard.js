import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderHistory from '../../components/orderHistory/OrderHistory';
import { getUserOrderHistory } from '../../redux/orders/orders.action';

const mapState = ({ user, ordersData }) => ({
    currentUser: user.currentUser,
    orderHistory: ordersData.orderHistory.data,
})

const Dashboard = () => {
    const dispatch = useDispatch();
    const { currentUser, orderHistory} = useSelector(mapState);
    window.document.title = `${currentUser.displayName}`;

    useEffect(() => {
        dispatch(getUserOrderHistory(currentUser.uid))
    }, [])
    return (
        <div >
            <h1>Order History </h1>
            <OrderHistory orders={orderHistory} />
        </div>
    )
}

export default Dashboard
