import React, { Component } from "react";
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

//let initial state be null
const initialState = {
	currentUser: null
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {...initialState}
	}

	//listen for a change in user
	authListener = null

	componentDidMount() {
		this.authListener = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot(snapshot => {
					this.setState({
						currentUser: {
							id: snapshot.id,
							...snapshot.data()
						}
					})
				})
			}
			this.setState({
				...initialState
			})
		})
	}

	componentWillUnmount() {
		this.authListener();
	}
	render() {
		const { currentUser } = this.state;
		return (
			<div className="App">
				<Switch>
					<Route exact path="/">
						<HomepageLayout currentUser={currentUser}>
							<Homepage />
						</HomepageLayout>
					</Route>
					<Route exact path="/register">
						{currentUser ? <Redirect to="/" /> : (
						<MainLayouts currentUser={currentUser}>
							<Register />
						</MainLayouts>
						)}
					</Route>
					<Route exact path="/login">
						{currentUser ? <Redirect to='/' /> : (
						<MainLayouts currentUser={currentUser}>
							<Login />
						</MainLayouts>
						)}
					</Route>
					<Route exact path="/recovery">
						<MainLayouts>
						<Recovery />
						</MainLayouts>
					</Route>
				</Switch>
			</div>
		);
	}
}

export default App;
