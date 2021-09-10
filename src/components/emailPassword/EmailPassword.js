import React, { useEffect, useState } from "react";
import "./emailPassword.scss";
import AuthWrapper from "../authWrapper/AuthWrapper";
import FormInput from "../forms/formInput/FormInput";
import Button from "../forms/button/Button";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAllAuthForms, resetPassword } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
	resetPasswordSuccess: user.resetPasswordSuccess,
	resetPasswordError: user.resetPasswordError,
});

const EmailPassword = (props) => {
	const [email, setEmail] = useState("");
	const [failedEmail, setFailedEmail] = useState([]);

	const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		if (resetPasswordSuccess) {
			dispatch(resetAllAuthForms())
			history.push("/login");
		}
	}, [resetPasswordSuccess]);

	useEffect(() => {
		if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
			setFailedEmail(resetPasswordError);
		}
	}, [resetPasswordError]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(resetPassword({ email }));

		// try {
		// 	//redirect users to login page after they sent reset email
		// 	const redirectUrl = {
		// 		url: "http://localhost:3000/login",
		// 	};
		// 	await auth
		// 		.sendPasswordResetEmail(email, redirectUrl)
		// 		.then(() => {
		// 			history.push("/login");
		// 		})
		// 		.catch((err) => {
		// 			setFailedEmail([err.message]);
		// 		});
		// } catch (error) {
		// 	console.log(error);
		// }
	};
	const configAuthWraper = {
		headline: "Email Recovery",
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
						handleChange={(e) => setEmail(e.target.value)}
					/>

					<Button type="submit">Recover</Button>
				</form>
			</AuthWrapper>
		</div>
	);
};

export default EmailPassword;
