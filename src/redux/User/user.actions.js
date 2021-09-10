import { auth, handleUserProfile, provider } from "../../firebase";
import userTypes from "./user.types";

//action to update redux store
export const setCurrentUser = (user) => ({
	type: userTypes.SET_CURRENT_USER,
	payload: user,
});

//signIn user with redux hooks
export const signInUser =
	({ email, password }) =>
	async (dispatch) => {
		try {
			await auth
				.signInWithEmailAndPassword(email, password)
				.then(() => {
					dispatch({
						type: userTypes.SIGN_IN_SUCCESS,
						payload: true,
					});
				})
				.catch((err) => {
					const signInErr = [err.message];
					dispatch({
						type: userTypes.SIGN_IN_ERROR,
						payload: signInErr,
					});
				});
		} catch (error) {
			console.log(error);
		}
	};

//signUp user with redux hooks
export const signUpEmailAndPass =
	({ email, password, displayName, confirmPassword }) =>
	async (dispatch) => {
		if (password !== confirmPassword) {
			const newError = ["Password don't match. Please try again."];
			dispatch({
				type: userTypes.SIGN_UP_ERROR,
				payload: newError,
			});
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			await handleUserProfile(user, { displayName });
			dispatch({
				type: userTypes.SIGN_UP_SUCCESS,
				payload: true,
			});
		} catch (error) {
			console.log(error);
		}
	};

//signUp user with redux hooks
export const resetPassword =
	({ email }) =>
	async (dispatch) => {
		//redirect users to login page after they sent reset email
		const redirectUrl = { url: "http://localhost:3000/login" };
		try {
			await auth
				.sendPasswordResetEmail(email, redirectUrl)
				.then(() => {
					dispatch({
						type: userTypes.RESET_PASSWORD_SUCCESS,
						payload: true,
					});
				})
				.catch((err) => {
					const resetPasswordErr = [err.message];
					dispatch({
						type: userTypes.RESET_PASSWORD_ERROR,
						payload: resetPasswordErr,
					});
				});
		} catch (error) {
			console.log(error);
		}
	};

//sign in with google
export const signInWithGoogle = () => async (dispatch) => {
	try {
		await auth.signInWithPopup(provider).then(() => {
			dispatch({
				type: userTypes.SIGN_IN_SUCCESS,
				payload: true,
			});
		});
	} catch (error) {
		console.log(error);
	}
};


//reset all auth forms 
export const resetAllAuthForms = () => {
	type: userTypes.RESET_AUTH_FORMS
}