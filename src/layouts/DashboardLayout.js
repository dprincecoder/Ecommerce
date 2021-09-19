import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutUserStart } from "../redux/User/user.actions";

import VerticalNav from "../components/verticalNav/VerticalNav";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const DashboardLayout = (props) => {
	const dispatch = useDispatch();

	const signOut = () => {
		dispatch(signOutUserStart());
	};

	return (
		<div className="dashboardLayout">
			<Header {...props} />
			<div className="controlPanel">
				<div className="sidebar">
					<VerticalNav>
						<ul>
							<li>
								<Link to="/dashboard">Home</Link>
							</li>
							<li>
								<span className="signOut" onClick={() => signOut()}>
									Sign Out
								</span>
							</li>
						</ul>
					</VerticalNav>
				</div>
				<div className="content">{props.children}</div>
			</div>
			<Footer />
		</div>
	);
};

export default DashboardLayout;
