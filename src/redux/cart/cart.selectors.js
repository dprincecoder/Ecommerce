import { createSelector } from "reselect";

//seletor to manage user cart number
export const selectCartData = (state) => state.cartData;

export const selectCartItems = createSelector(
	[selectCartData],
	(cartData) => cartData.cartItems
);

export const selectCartItemsCount = createSelector(
	[selectCartItems],
	(cartItems) =>
		cartItems.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
	[selectCartItems],
	(cartItems) =>
	cartItems.reduce(
		(quantity, cartItem) =>
			quantity + cartItem.quantity * cartItem.productPrice,
		0
	)
);
