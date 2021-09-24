import { auth } from '../../firebase';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { handleAddProduct, handleDeleteProducts, handleFetchProduct, handleFetchProducts } from './product.helpers';
import productsTypes from './products.types';
import { setProducts, fetchProductsStart, setProduct } from './products.actions';

export function* addProduct({ payload }) {
    try {
        const timestamp = new Date()
        yield handleAddProduct({
            ...payload,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timestamp
        });
        yield put(fetchProductsStart());
        
        
    } catch (error) {
        alert(error)
    }
}
export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts({ payload}) {
    try {
        const products = yield handleFetchProducts(payload);
        yield put(setProducts(products))
    } catch (error) {
        console.log(error)
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({ payload }) {
    try {
        yield handleDeleteProducts(payload);
        yield put(fetchProductsStart())
    } catch (error) {
        alert(error)
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
}

export function* fetchProduct({ payload }) {
    try {
        const product = yield handleFetchProduct(payload);
        yield put(setProduct(product))
    } catch (error) {
        console.log(error);
    }
}

export function* onFetchProductStart(){
    yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct)
}
export default function* productSagas() {
    yield all([call(onAddProductStart), call(onFetchProductsStart), call(onDeleteProductStart), call(onFetchProductStart)]);
}