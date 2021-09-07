import React from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const MainLayouts = (props) => {
	return (
		<div className="fullHeight">
			<Header {...props}/>
			{props.children}
			<Footer />
		</div>
	);
};

export default MainLayouts;
