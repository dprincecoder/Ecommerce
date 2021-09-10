import userTypes from "./user.types";

//let initial state of user be null
const INITIAL_STATE = {
	currentUser: null,
	signInSuccess: false,
	signUpSuccess: false,
	signUpError: [],
    signInError: [],
    resetPasswordSuccess: false,
    resetPasswordError: []
};

//user switch and known state function
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
			case userTypes.SET_CURRENT_USER:
				return {
					...state,
					currentUser: action.payload,
				};
			case userTypes.SIGN_IN_SUCCESS:
				return {
					...state,
					signInSuccess: action.payload,
				};
			case userTypes.SIGN_IN_ERROR:
				return {
					...state,
					signInError: action.payload,
				};
			case userTypes.SIGN_UP_ERROR:
				return {
					...state,
					signUpError: action.payload,
				};
			case userTypes.SIGN_UP_SUCCESS:
				return {
					...state,
					signUPSuccess: action.payload,
				};
			case userTypes.RESET_PASSWORD_SUCCESS:
				return {
					...state,
					resetPasswordSuccess: action.payload,
				};
			case userTypes.RESET_PASSWORD_ERROR:
				return {
					...state,
					resetPasswordError: action.payload,
				};
				case userTypes.RESET_AUTH_FORMS:
				return {
					...state,
					signInSuccess: false,
					signUpSuccess: false,
					signUpError: [],
    				signInError: [],
    				resetPasswordSuccess: false,
    				resetPasswordError: []
				};
			default:
				return state;
		}
}

export default userReducer