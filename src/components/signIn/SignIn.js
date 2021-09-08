import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, signInWithGoogle } from "../../firebase";
import AuthWrapper from "../authWrapper/AuthWrapper";
import Button from "../forms/button/Button";
import FormInput from "../forms/formInput/FormInput";
import "./signIn.scss";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setEmail(" ");
            setPassword(" ");
        } catch (error) {
            console.log(error);
        }
	};

	const configAuthWraper = {
		headline: "Login"
	}

	return (
		<AuthWrapper {...configAuthWraper}>
			<div className="formWrap">
				<form onSubmit={handleSubmit}>
					<FormInput
						type="email"
						placeholder="Enter email address"
						value={email}
						name="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<FormInput
						type="password"
						placeholder="Enter Password"
						value={password}
						name="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button>Login</Button>
					<div className="socialSign">
						<div className="row">
							<Button onClick={signInWithGoogle}>Sign In with Google</Button>
						</div>
					</div>
				</form>
				<Link to="/recovery">Forgotten Password ?</Link>
			</div>
		</AuthWrapper>
	);
};

export default SignIn;
