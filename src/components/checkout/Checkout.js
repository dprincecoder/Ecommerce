import React from 'react'
import './checkout.scss'
import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors';
import {createStructuredSelector} from 'reselect'
import { useSelector } from 'react-redux';
import Item from "./item/Item";
import Button from "../forms/button/Button"
import { useHistory } from 'react-router-dom';

const mapState = createStructuredSelector({
    cartItems: selectCartItems, 
    total: selectCartTotal
})
const Checkout = () => {
    const history = useHistory()
    const { cartItems, total } = useSelector(mapState);
    return (
			<div className="checkout">
				<h1>Checkout</h1>

				<div className="cart">
					{cartItems.length > 0 ? (
						<table border="0" cellPadding="0" cellSpacing="0">
							<tbody>
								<tr>
									<td>
										<table
											className="checkoutHeader"
											border="0"
											cellPadding="10"
											cellSpacing="0">
											<tbody>
												<tr>
													<th>Product</th>
													<th>Description</th>
													<th>Quantity</th>
													<th>Price</th>
													<th>Remove</th>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
								<tr>
									<td>
										<table border="0" cellSpacing="0" cellPadding="0">
											<tbody>
												{cartItems.map((item, index) => {
													return (
														<tr key={index}>
															<td>
																<Item {...item} />
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</td>
								</tr>
								<tr>
									<td>
										<table border="0" cellSpacing="0" cellPadding="0">
											<tbody>
												<tr>
													<td>
														<table border="0" cellPadding="10" cellSpacing="0">
															<tbody>
																<tr>
																	<td>
																		<h3>Total: ${total}</h3>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
												<tr>
													<td>
														<table border="0" cellPadding="10" cellSpacing="0">
															<tbody>
																<tr>
																	<td>
																		<Button onClick={() => history.goBack()}>
																			Continue Shopping
																		</Button>
																	</td>
																	<td>
																		<Button
																			onClick={() => history.push("/payment")}>
																			Checkout
																		</Button>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					) : (
						<div className="">
							<p>
								You currently dont have a item to your cart, please continue
								shopping.
							</p>
							<Button onClick={() => history.push("/search")}>
								Lets Go Shopping
							</Button>
						</div>
					)}
				</div>
			</div>
		);
}

export default Checkout;
