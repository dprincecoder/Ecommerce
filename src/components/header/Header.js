import React from "react";
import "./header.scss";
import logo from "./dpLogo1.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "../../redux/User/user.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

//retrun currentUser object from state passed in userReducer
const mapState = (state) => ({
	currentUser: state.user.currentUser,
	totalNumOfCartItems: selectCartItemsCount(state),
});

const Header = (props) => {
	const dispatch = useDispatch();

	const { currentUser, totalNumOfCartItems } = useSelector(mapState);

	const signOut = () => {
		dispatch(signOutUserStart());
	};

	return (
		<header className="header">
			<div className="wrap">
				<div className="logo">
					<Link to="/">
						<img src={logo} alt="dprincecoder logo" />
					</Link>
				</div>

				<nav>
					<ul>
						<li>
							<Link to="/search"> Search</Link>
						</li>
						<li>
							<Link to="/"> Home</Link>
						</li>
					</ul>
				</nav>

				<div className="callToActions">
					<ul>
						{currentUser
							? [
								<li>
									<Link to="/cart">Your cart ({totalNumOfCartItems})</Link>
								</li>,
									<li key="0">
										<Link to="/dashboard"> Dashboard</Link>
									</li>,
									<li key="1">
										<span onClick={() => signOut()}>LOGOUT</span>
									</li>,
							  ]
							: [
									<li key="0">
										<Link to="/register"> Register</Link>
									</li>,
									<li key="1">
										<Link to="/login"> Login</Link>
									</li>,
							  ]}
					</ul>
				</div>
			</div>
		</header>
	);
};

Header.defaultProps = {
	currentUser: null,
};

export default Header;
