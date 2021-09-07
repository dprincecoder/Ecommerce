import {Switch, Route} from "react-router-dom"
import './default.scss';
import MainLayouts from "./layouts/MainLayouts";
import HomepageLayout from "./layouts/HomepageLayout";

//pages
import Homepage from './pages/homepage/Homepage';
import Login from "./pages/login/Login";
import Register from "./pages/registration/Register";


function App() {
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
			</Switch>
		</div>
	);
}

export default App;
