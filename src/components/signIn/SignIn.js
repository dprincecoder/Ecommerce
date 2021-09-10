import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { resetAllAuthForms, signInUser, signInWithGoogle, } from "../../redux/User/user.actions";
import AuthWrapper from "../authWrapper/AuthWrapper";
import Button from "../forms/button/Button";
import FormInput from "../forms/formInput/FormInput";
import "./signIn.scss";

const mapState = ({ user }) => ({
	signInSuccess: user.signInSuccess,
	signInError: user.signInError,
});
const SignIn = (props) => {
	const dispatch = useDispatch();
	const { signInSuccess, signInError } = useSelector(mapState);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		if (signInSuccess) {
			reset();
			dispatch(resetAllAuthForms())
			props.history.push("/");
		}
	}, [signInSuccess]);

	useEffect(() => {
		if (Array.isArray(signInError) && signInError.length > 0) {
			setErrors(signInError);
		}
	}, [signInError]);

	//reset form input
	const reset = () => {
		setEmail("");
		setPassword("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		dispatch(signInUser({email, password}));

		// try {
		// 	await auth
		// 		.signInWithEmailAndPassword(email, password)
		// 		.then(() => {
		// 			// reset();
		// 			// props.history.push("/");
		// 		})
		// 		.catch((err) => {
		// 			setErrors([err.message]);
		// 		});
		// } catch (error) {
		// 	console.log(error);
		// }
	};
	const loginWithGoogle = () => {
		dispatch(signInWithGoogle())
	}

	const configAuthWraper = {
		headline: "Login",
	};

	return (
		<AuthWrapper {...configAuthWraper}>
			<div className="formWrap">
				{errors.length > 0 && (
					<ul>
						{errors.map((err, index) => (
							<li key={index}> {err}</li>
						))}
					</ul>
				)}
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
						<Button onClick={loginWithGoogle}>Sign In with Google</Button>
					</div>
				</div>
				<Link to="/recovery">Forgotten Password ?</Link>
			</div>
		</AuthWrapper>
	);
};

export default withRouter(SignIn);
