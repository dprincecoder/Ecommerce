import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import productsReducer from "./products/product.reducer";
import cartReducer from "./cart/cart.reducer";
import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import ordersReducer from "./orders/orders.reducer";

export const rootReducer =  combineReducers({
	user: userReducer,
	productsData: productsReducer,
	cartData: cartReducer,
	ordersData: ordersReducer
});

//persist user cart item in local storage using redux persist
const configStorage = {
	key: "root",
	storage,
	whitelist: ["cartData"]
};

export default persistReducer(configStorage, rootReducer);