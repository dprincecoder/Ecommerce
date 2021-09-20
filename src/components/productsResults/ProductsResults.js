import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchProductsStart } from "../../redux/products/products.actions";
import FormSelect from "../forms/formSelect/FormSelect";
import LoadMore from "../loadMore/LoadMore";
import Product from "./product/Product";
import "./productsResult.scss";

//bring all products from redux store
const mapState = ({ productsData }) => ({
	products: productsData.products,
});
const ProductsResults = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { filterType } = useParams(); //get the parameters from the url and pass it to redux and formSelect
	console.log(filterType);
	const { products } = useSelector(mapState);
	const { data, queryDoc, isLastPage } = products;

	useEffect(() => {
		dispatch(fetchProductsStart({ filterType }));
	}, [filterType]);

	const handleFilter = (e) => {
		const nextFilter = e.target.value;
		history.push(`/search/${nextFilter}`);
	};

	//check if no products is available in database
	if (!Array.isArray(data)) return null;
	if (data.length < 1) {
		return (
			<div className="products">
				<p>No Search Results found</p>
			</div>
		);
	}

	const configFilters = {
		defaultValue: filterType,
		options: [
			{ name: "Show all", value: "" },
			{ name: "Mens", value: "mens" },
			{ name: "Womens", value: "womens" },
		],
		handleChange: handleFilter,
	};

	const handleLoadMore = () => {
		dispatch(fetchProductsStart({ filterType, startAfterDoc: queryDoc, persistProducts: data }));
	};

	const configLoadMore = {
		onLoadMoreEvt: handleLoadMore,
	};
	return (
		<div className="products">
			<h1>Browse Products</h1>

			<FormSelect {...configFilters} />

			<div className="productsResults">
				{data.map((product, index) => {
					const { productThumbnail, productName, productPrice } = product;
					// handle no product value error
					if (
						!productThumbnail ||
						!productName ||
						typeof productPrice === "undefined"
					)
						return null;
					const configProduct = {
						productThumbnail,
						productName,
						productPrice,
					};
					return <Product key={index} {...configProduct} />;
				})}
			</div>
			{!isLastPage && (
			<LoadMore {...configLoadMore} />
			)}
		</div>
	);
};

export default ProductsResults;
