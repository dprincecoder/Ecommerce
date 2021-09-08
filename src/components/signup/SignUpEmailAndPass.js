import React, { Component } from "react";
import { auth, handleUserProfile } from "../../firebase";
import AuthWrapper from "../authWrapper/AuthWrapper";
import Button from "../forms/button/Button";
import FormInput from "../forms/formInput/FormInput";
import "./SignUpEmailAndPass.scss";

//divine initialState
const initialState = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
	error: [],
};
export class SignUpEmailAndPass extends Component {
	constructor(props) {
		super(props);
		this.state = { ...initialState };

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const { displayName, email, password, confirmPassword, error } = this.state;
		if (password !== confirmPassword) {
			const newError = ["Password don't match. Please try again."];
			this.setState({
				error: newError,
			});
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			await handleUserProfile(user, { displayName });

			this.setState({ ...initialState });
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const configAuthWraper = {
			headline: "SignUp",
		};
		const { displayName, email, password, confirmPassword, error } = this.state;
		return (
			<AuthWrapper {...configAuthWraper}>
				<div className="formWrap">
					{error.length > 0 && (
						<ul>
							{error.map((err, index) => (
								<li key={index}> {err}</li>
							))}
						</ul>
					)}

					<form onSubmit={this.handleSubmit}>
						<FormInput
							type="text"
							name="displayName"
							value={displayName}
							placeholder="Enter full name"
							onChange={this.handleChange}
						/>

						<FormInput
							type="text"
							name="email"
							value={email}
							placeholder="Enter email address"
							onChange={this.handleChange}
						/>

						<FormInput
							type="password"
							name="password"
							value={password}
							placeholder="Enter your password"
							onChange={this.handleChange}
						/>

						<FormInput
							type="password"
							name="confirmPassword"
							value={confirmPassword}
							placeholder="Confirm your password"
							onChange={this.handleChange}
						/>

						<Button type="submit">Register</Button>
					</form>
				</div>
			</AuthWrapper>
		);
	}
}

export default SignUpEmailAndPass;
