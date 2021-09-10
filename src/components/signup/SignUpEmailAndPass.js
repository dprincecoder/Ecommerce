import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { signUpEmailAndPass, resetAllAuthForms } from "../../redux/User/user.actions";
import AuthWrapper from "../authWrapper/AuthWrapper";
import Button from "../forms/button/Button";
import FormInput from "../forms/formInput/FormInput";
import "./SignUpEmailAndPass.scss";

const mapState = ({ user }) => ({
	signUpSuccess: user.signUpSuccess,
	signUpError: user.signUpError
})

const SignUpEmailAndPass = (props) => {
	//divine initialState
	const dispatch = useDispatch();
	const {signUpError, signUpSuccess} = useSelector(mapState)
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("password");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [displayName, setDisplayName] = useState("");

	useEffect(() => {
		if (signUpSuccess) {
			reset();
			dispatch(resetAllAuthForms())
			props.history.push('/')
		}
	}, [signUpSuccess]);

	useEffect(() => {
		if (Array.isArray(signUpError) && signUpError.length > 0) {
			setErrors(signUpError);
		}
	}, [signUpError])

	//reset form input
	const reset = () => {
		setEmail("");
		setConfirmPassword("");
		setDisplayName("");
		setErrors([]);
		setPassword("");
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		dispatch(signUpEmailAndPass({email, password, displayName, confirmPassword}))
	};

	const configAuthWraper = {
		headline: "SignUp",
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
						type="text"
						name="displayName"
						value={displayName}
						placeholder="Enter full name"
						handleChange={e => setDisplayName(e.target.value)}
					/>

					<FormInput
						type="email"
						name="email"
						value={email}
						placeholder="Enter email address"
						handleChange={(e) => setEmail(e.target.value)}
					/>

					<FormInput
						type="password"
						name="password"
						value={password}
						placeholder="Enter your password"
						handleChange={e => setPassword(e.target.value)}
					/>

					<FormInput
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						placeholder="Confirm your password"
						handleChange={(e) => setConfirmPassword(e.target.value)}
					/>

					<Button type="submit">Register</Button>
				</form>
			</div>
		</AuthWrapper>
	);
}


export default withRouter(SignUpEmailAndPass);
