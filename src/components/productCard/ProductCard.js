import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addProduct } from "../../redux/cart/cart.action";
import { fetchProductStart, setProduct } from "../../redux/products/products.actions";
import Button from "../forms/button/Button"
import "./productCard.scss";
const mapState = (state) => ({
	product: state.productsData.product,
});
const ProductCard = () => {
	const { productID } = useParams();
	const dispatch = useDispatch();
	const { product } = useSelector(mapState);

	const { productName, productPrice, productThumbnail, productDesc } = product;
	useEffect(() => {
		dispatch(fetchProductStart(productID));
        return () => {
            dispatch(setProduct({}))
        }
	}, []);

const configAddToCartBtn = {
    type: "button"
}

const handleAddToCart = product => {
	if (!product) return;
	dispatch(addProduct(product))
}
	return (
		<div className="productCard">
			<div className="hero">
				<img src={productThumbnail} alt={productName} />
			</div>
			<ul>
				<li>
					<h1>{productName}</h1>
				</li>
				<li>
					<span>${productPrice}</span>
				</li>
                <li>
                
                <div className="addToCart">
                    <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                </div>
                </li>
                <li>
                    <span dangerouslySetInnerHTML={{ __html: productDesc}}/>
                </li>
			</ul>
		</div>
	);
};

export default ProductCard;
