import React, { useState } from "react";
import { auth, signInWithGoogle } from "../../firebase";
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

	return (
		<div className="signIn">
			<div className="wrap">
				<h2>Login</h2>

				<div className="formGrap">
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
                        <Button>
                            Login
                        </Button>
						<div className="socialSign">
							<div className="row">
								<Button onClick={signInWithGoogle}>Sign In with Google</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
