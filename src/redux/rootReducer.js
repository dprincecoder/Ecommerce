import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import productsReducer from "./products/product.reducer";
import cartReducer from "./cart/cart.reducer";

export default combineReducers({
	user: userReducer,
	productsData: productsReducer,
	cartData: cartReducer,
});