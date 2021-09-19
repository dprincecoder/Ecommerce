import { auth } from '../../firebase';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { handleAddProduct, handleDeleteProducts, handleFetchProducts } from './product.helpers';
import productsTypes from './products.types';
import { setProducts, fetchProductsStart, deleteProductStart } from './products.actions';

export function* addProduct({ payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice,
    productDesc,
} }) {
    try {
        const timestamp = new Date()
        yield handleAddProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productDesc,
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

export function* fetchProducts({ payload: {filterType}}) {
    try {
        const products = yield handleFetchProducts({filterType});
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
export default function* productSagas() {
    yield all([call(onAddProductStart), call(onFetchProductsStart), call(onDeleteProductStart)]);
}