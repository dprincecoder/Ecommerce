import React from "react";
import "./product.scss";
import Button from "../../forms/button/Button";
import { Link } from "react-router-dom";

const Product = ({
	documentID,
	productThumbnail,
	productName,
	productPrice,
}) => {
	// handle no product value error
	if (
		!documentID ||
		!productThumbnail ||
		!productName ||
		typeof productPrice === "undefined"
	)
		return null;

	const configAddToCartBtn = {
		type: "button",
	};
	return (
		<div className="product">
			<div className="thumb">
				<Link to={`/product/${documentID}`}>
					<img src={productThumbnail} alt={productName} />
				</Link>
			</div>

			<div className="details">
				<ul>
					<li>
						<span className="name">
							<Link to={`/product/${documentID}`}>{productName}</Link>
						</span>
					</li>
					<li>
						<Link to={`/product/${documentID}`}>{productPrice}</Link>
					</li>
					<div className="addToCart">
						<Button {...configAddToCartBtn}>Add to cart</Button>
					</div>
				</ul>
			</div>
		</div>
	);
};

export default Product;
