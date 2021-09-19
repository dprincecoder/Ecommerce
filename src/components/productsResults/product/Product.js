import React from 'react';
import "./product.scss"
import Button from "../../forms/button/Button"

const Product = ({ productThumbnail, productName, productPrice }) => {
	// handle no product value error
	if (!productThumbnail || !productName || typeof productPrice === "undefined")
		return null;
        
    const configAddToCartBtn = {
        type: "button"
    }
	return <div className="product">
        <div className="thumb">
        <img src={productThumbnail} alt={productName} /></div>
        
        <div className="details">
            <ul>
                <li>
                    <span className="name">{productName}</span>
                </li>
                <li>
                    <span className="price">${productPrice}</span>
                </li>
                <div className="addToCart">
                    <Button {...configAddToCartBtn}>Add to cart</Button>
                </div>
            </ul>
        </div>
    </div>;
};

export default Product;
