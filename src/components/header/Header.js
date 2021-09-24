import React, { useState } from "react";
import "./header.scss";
import logo from "./dpLogo1.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "../../redux/User/user.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

//retrun currentUser object from state passed in userReducer
const mapState = (state) => ({
	currentUser: state.user.currentUser,
	totalNumOfCartItems: selectCartItemsCount(state),
});

const Header = (props) => {
	const dispatch = useDispatch();
	const [activeMenu, setActiveMenu] = useState("");

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

				<nav className={`mainMenu ${activeMenu ? "active" : ""}`}>
					<ul>
						<li>
							<Link to="/search">Search</Link>
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
									<li key="0">
										<Link to="/cart">
											Your Cart
											<ShoppingCartIcon />
										</Link>
										({totalNumOfCartItems})
									</li>,
									<li key="1">
										<Link to="/dashboard">
											{" "}
											Dashboard
											<AccountCircleIcon />
										</Link>
									</li>,
									<li key="2">
										<span onClick={() => signOut()}>
											<LockOpenIcon />
											LOGOUT
										</span>
									</li>,
							  ]
							: [
									<li key="0" >
										<Link to="/register">
											<PersonAddIcon /> 
											Register
										</Link>
									</li>,
									<li key="1">
										<Link to="/login">
											<LoginIcon />	
											Login
										</Link>
									</li>,
							  ]}
						<li className="mobileMenu">
							<span onClick={() => setActiveMenu(!activeMenu)}>
								<MenuIcon />
							</span>
						</li>
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
