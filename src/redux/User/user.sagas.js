import { takeLatest, call, all, put } from "redux-saga/effects";
import { auth, handleUserProfile, getCurrentUser, provider } from "../../firebase";
import { resetPasswordSuccess, signInSuccess, signOutUserSuccess, userError } from "./user.actions";
import { handleResetPasswordAPI } from "./user.helpers";
import userTypes from "./user.types";

//listen for a change in user
export function* getSnapshotFromUserAuth(user, additionalData = {}) {
	//listen for a change in user
	try {
		const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
		const snapshot = yield userRef.get();
		yield put(
			signInSuccess({
				id: snapshot.id,
				...snapshot.data(),
			})
		);
	} catch (error) {
		console.log(error);
	}
}

export function* emailSignIn({ payload: { email, password } }) {
	try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield localStorage.setItem("currentUser", JSON.stringify(user));
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		console.log(error);
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    } catch (error) {
        console.log(error);
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
    try {
        yield auth.signOut();
        yield put(signOutUserSuccess())
        yield localStorage.setItem("currentUser", null);
        yield window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}


export function* signUpUser({payload: { email, password, displayName, confirmPassword}}) {
	if (password !== confirmPassword) {
        const newError = ["Password don't match. Please try again."];
        yield put(userError(newError));
        return;
	}

	try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield localStorage.setItem("user", user);
        const additionalData = { displayName }
        yield getSnapshotFromUserAuth(user, additionalData)
        // yield (handleUserProfile, { userAuth: user, additionalData: { displayName } });
	} catch (error) {
		console.log(error);
	}
}

export function* onSignUpUserStart() {
	yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}


export function* resetPassword({ payload: { email}}) {
	try {
        yield call(handleResetPasswordAPI, email);
        yield put(resetPasswordSuccess())
    } catch (error) {
        yield put(userError(error))
    }
}

export function* onResetPasswordStart() {
	yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* googleSignIn() {
	try {
        const { user } = yield auth.signInWithPopup(provider);
        yield localStorage.setItem("currentUser", JSON.stringify(user));
        yield getSnapshotFromUserAuth(user);
	} catch (error) {
		console.log(error);
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}


export default function* userSagas() {
    yield all([
        call(onEmailSignInStart), call(onCheckUserSession),
        call(onSignOutUserStart), call(onResetPasswordStart),
        call(onSignUpUserStart), call(onGoogleSignInStart)
    ]);
}
