import React, { useEffect } from "react";
import { Switch, Route} from "react-router-dom";
import "./default.scss";
import MainLayouts from "./layouts/MainLayouts";
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


const App = (props) => {

	//distructure setCurrentUser action from props
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(checkUserSession());
	}, [])

		return (
			<div className="App">
				<Switch>
					<Route exact path="/">
						<HomepageLayout>
							<Homepage />
						</HomepageLayout>
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
						<MainLayouts>
							<Dashboard />
						</MainLayouts>
						</WithAuth>
					</Route>
				</Switch>
			</div>
		);
	}


export default App;
