import React, { useEffect } from "react";
import { Switch, Route} from "react-router-dom";
import "./default.scss";
import MainLayouts from "./layouts/MainLayouts";
import AdminLayouts from "./layouts/AdminLayouts"
import DashboardLayout from "./layouts/DashboardLayout"
import HomepageLayout from "./layouts/HomepageLayout";

//pages
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/registration/Register";
import Recovery from "./pages/recovery/Recovery";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./redux/User/user.actions";
import Dashboard from "./pages/dashboard/Dashboard";
import WithAuth from "./higherOtherComponent/withAuth";
import Admin from "./pages/admin/Admin";
import WithAdminAuth from "./higherOtherComponent/withAdminAuth";
import AdminToolBar from "./components/adminToolBar/AdminToolBar";
import Search from "./pages/search/Search";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Payment from "./pages/payment/Payment";
import Order from "./pages/order/Order";

const App = (props) => {
    window.document.title = "Dprincecoder's store";

	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(checkUserSession());
	}, [])

		return (
			<div className="App">
				<AdminToolBar />
				<Switch>
					<Route exact path="/">
						<HomepageLayout>
							<Homepage />
						</HomepageLayout>
					</Route>
					<Route exact path="/search">
						<MainLayouts>
							<Search />
						</MainLayouts>
					</Route>
					<Route exact path="/search/:filterType">
						<MainLayouts>
							<Search />
						</MainLayouts>
					</Route>
					<Route exact path="/product/:productID">
						<MainLayouts>
							<ProductDetails />
						</MainLayouts>
					</Route>
					<Route exact path="/cart">
						<MainLayouts>
							<Cart />
						</MainLayouts>
					</Route>
					<Route exact path="/payment">
						<WithAuth>
						<MainLayouts>
							<Payment />
						</MainLayouts>
						</WithAuth>
					</Route>
					<Route exact path="/register">
						<MainLayouts>
							<Register />
						</MainLayouts>
					</Route>
					<Route exact path="/login">
						<MainLayouts>
							<Login />
						</MainLayouts>
					</Route>
					<Route exact path="/recovery">
						<MainLayouts>
							<Recovery />
						</MainLayouts>
					</Route>
					<Route exact path="/dashboard">
						<WithAuth>
							<DashboardLayout>
								<Dashboard />
							</DashboardLayout>
						</WithAuth>
					</Route>
					<Route exact path="/order/:orderID">
						<WithAuth>
							<DashboardLayout>
								<Order/>
							</DashboardLayout>
						</WithAuth>
					</Route>
					<Route exact path="/admin">
						<WithAdminAuth>
							<AdminLayouts>
								<Admin />
							</AdminLayouts>
						</WithAdminAuth>
					</Route>
				</Switch>
			</div>
		);
	}

export default App;
