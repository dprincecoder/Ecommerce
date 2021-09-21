import axios from 'axios'

//determine if a logged in user is admin
export const checkUserIsAdmin = currentUser => {
    if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
    const { userRoles } = currentUser;
    if (userRoles.includes('admin')) return true;
    return false
}

export const apiInstance = axios.create({
	baseURL: "https://us-central1-ecommerce-web-fc5d7.cloudfunctions.net/api",
});