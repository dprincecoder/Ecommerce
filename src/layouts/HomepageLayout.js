import React from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const MainLayouts = (props) => {
	return (
		<div className="fullHeight">
			<Header />
			<div className="main">{props.children}</div>
			<Footer />
		</div>
	);
};

export default MainLayouts;
