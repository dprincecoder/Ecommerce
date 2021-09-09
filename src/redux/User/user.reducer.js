import userTypes from "./user.types";

//let initial state of user be null
const INITIAL_STATE = {
    currentUser: null
}

//user switch and known state function
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state
    }
}

export default userReducer