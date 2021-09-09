import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth, signInWithGoogle } from "../../firebase";
import AuthWrapper from "../authWrapper/AuthWrapper";
import Button from "../forms/button/Button";
import FormInput from "../forms/formInput/FormInput";
import "./signIn.scss";

const SignIn = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//reset form input
	const reset = () => {
		setEmail("");
		setPassword("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await auth.signInWithEmailAndPassword(email, password);
			reset();
			props.history.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	const configAuthWraper = {
		headline: "Login",
	};

	return (
		<AuthWrapper {...configAuthWraper}>
			<div className="formWrap">
				<form onSubmit={handleSubmit}>
					<FormInput
						type="email"
						placeholder="Enter email address"
						value={email}
						name="email"
						handleChange={(e) => setEmail(e.target.value)}
					/>
					<FormInput
						type="password"
						placeholder="Enter Password"
						value={password}
						name="password"
						handleChange={(e) => setPassword(e.target.value)}
					/>
					<Button type="submit">Login</Button>
				</form>
				<div className="socialSign">
					<div className="row">
						<Button onClick={signInWithGoogle}>Sign In with Google</Button>
					</div>
				</div>
				<Link to="/recovery">Forgotten Password ?</Link>
			</div>
		</AuthWrapper>
	);
};

export default withRouter(SignIn);
