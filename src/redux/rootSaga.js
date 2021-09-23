import {all, call} from "redux-saga/effects";
import ordersSagas from "./orders/orders.sagas";
import productSagas from "./products/product.sagas";
import userSagas from "./User/user.sagas";



export default function* rootSaga() {
    yield all([call(userSagas), call(productSagas), call(ordersSagas)])
}