import React, { useEffect, useState } from "react";
import "./emailPassword.scss";
import AuthWrapper from "../authWrapper/AuthWrapper";
import FormInput from "../forms/formInput/FormInput";
import Button from "../forms/button/Button";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  resetPasswordStart, resetUserState } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
	resetPasswordSuccess: user.resetPasswordSuccess,
	userError: user.userError,
});

const EmailPassword = (props) => {
	const [email, setEmail] = useState("");
	const [failedEmail, setFailedEmail] = useState([]);

	const { resetPasswordSuccess, userError } = useSelector(mapState);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		if (resetPasswordSuccess) {
			dispatch(resetUserState())
			history.push("/login");
		}
	}, [resetPasswordSuccess]);

	useEffect(() => {
		if (Array.isArray(userError) && userError.length > 0) {
			setFailedEmail(userError);
		}
	}, [userError]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(resetPasswordStart({ email }));
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
