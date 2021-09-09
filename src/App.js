import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./default.scss";
import MainLayouts from "./layouts/MainLayouts";
import HomepageLayout from "./layouts/HomepageLayout";

//pages
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/registration/Register";
import { auth, handleUserProfile } from "./firebase";
import Recovery from "./pages/recovery/Recovery";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/User/user.actions";
import Dashboard from "./pages/dashboard/Dashboard";
import WithAuth from "./higherOtherComponent/withAuth";


const App =(props) => {

	//distructure setCurrentUser action from props
	const { setCurrentUser, currentUser } = props;
	
	useEffect(() => {
		//listen for a change in user
		const  authListener = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot(snapshot => {
					setCurrentUser({
						id: snapshot.id,
						...snapshot.data()
					})
				})
			}
			
			setCurrentUser(userAuth)
		})
		 return () => {authListener()};
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
						{currentUser ? (
							<Redirect to="/" />
						) : (
							<MainLayouts>
								<Register />
							</MainLayouts>
						)}
					</Route>
					<Route exact path="/login">
						{currentUser ? (
							<Redirect to="/" />
						) : (
							<MainLayouts>
								<Login />
							</MainLayouts>
						)}
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


const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
