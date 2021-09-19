import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import VerticalNav from "../components/verticalNav/VerticalNav";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { signOutUserStart } from "../redux/User/user.actions";

const AdminLayout = (props) => {
	const dispatch = useDispatch();

	const signOut = () => {
		dispatch(signOutUserStart());
	};

	return (
		<div className="adminLayout">
			<Header {...props} />
			<div className="controlPanel">
				<div className="sidebar">
					<VerticalNav>
						<ul>
							<li>
								<Link to="/admin">Home</Link>
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

export default AdminLayout;
