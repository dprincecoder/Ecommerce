import React, { useState } from "react";
import "./emailPassword.scss";
import AuthWrapper from "../authWrapper/AuthWrapper";
import FormInput from "../forms/formInput/FormInput";
import Button from "../forms/button/Button";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";

const EmailPassword = (props) => {
	const [email, setEmail] = useState("");
	const [failedEmail, setFailedEmail] = useState([]);

	const history = useHistory();

	const configAuthWraper = {
		headline: "Email Recovery",
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			//redirect users to login page after they sent reset email
			const redirectUrl = {
				url: "http://localhost:3000/login",
			};
			await auth
				.sendPasswordResetEmail(email, redirectUrl)
				.then(() => {
					history.push("/login");
				})
				.catch((err) => {
					setFailedEmail([err.message]);
				});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<AuthWrapper {...configAuthWraper}>
				<div className="err">
					{failedEmail.length > 0 && (
						<ul>
							{failedEmail.map((err, i) => (
								<li key={i}>{err}</li>
							))}
						</ul>
					)}
				</div>
				<form onSubmit={handleSubmit}>
					<FormInput
						type="email"
						value={email}
						naem="email"
						placeholder="Enter registered Email"
						onChange={(e) => setEmail(e.target.value)}
					/>

					<Button type="submit">Recover</Button>
				</form>
			</AuthWrapper>
		</div>
	);
};

export default EmailPassword;
