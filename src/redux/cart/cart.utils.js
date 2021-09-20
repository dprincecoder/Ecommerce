//helper function to implicitly return new cartitem but increase already existing cartitem
export const existingCartItem = ({ prevCartItems, nextCartItem }) => {
	return prevCartItems.find(
		(cartItem) => cartItem.documentID === nextCartItem.documentID
	);
};

//helper function to check user cart items before adding new one
export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
	const quantityIncrements = 1;
	const cartItemExists = existingCartItem({ prevCartItems, nextCartItem });
	if (cartItemExists) {
		return prevCartItems.map((cartItem) =>
			cartItem.documentID == nextCartItem.documentID
				? { ...cartItem, quantity: cartItem.quantity + quantityIncrements }
				: cartItem
		);
	}

	return [...prevCartItems, { ...nextCartItem, quantity: quantityIncrements }];
};

export const handleRemoveCartItem = ({ prevCartItems, cartItemToRemove }) => {
	return prevCartItems.filter(
		(item) => item.documentID !== cartItemToRemove.documentID
	);
};

export const handleReduceCartItem = ({ prevCartItems, cartItemToReduce }) => {
	const existingCartItem = prevCartItems.find(
		(cartItem) => cartItem.documentID === cartItemToReduce.documentID
	);

	if (existingCartItem.quantity === 1) {
		return prevCartItems.filter(
			(cartItem) => cartItem.documentID !== existingCartItem.documentID
		);
	}
	//map through the previous cartItems then decrease the same
	//item quantity or no existing cartitem then keep the previous cartitem as it is
	return prevCartItems.map((cartItem) =>
		cartItem.documentID === existingCartItem.documentID
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};
