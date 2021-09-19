import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import productsReducer from "./products/product.reducer";

export default combineReducers({
	user: userReducer,
	productsData: productsReducer,
});