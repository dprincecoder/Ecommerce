import React from 'react'
import ProductsResults from '../../components/productsResults/ProductsResults';

const Search = () => {
    window.document.title = "Products";
    return (
        <div className="search" style={{display: "flex"}}>
            <ProductsResults />
            
        </div>
    )
}

export default Search;
