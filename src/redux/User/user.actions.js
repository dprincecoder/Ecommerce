import userTypes from './user.types'

//action to update redux store
export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
})