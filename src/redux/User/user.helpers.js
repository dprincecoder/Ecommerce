import { auth } from "../../firebase";

export const handleResetPasswordAPI = email => {
    //redirect users to login page after they sent reset email
    const redirectUrl = { url: "http://localhost:3000/login" };

    return new Promise((resolve, reject) => {
        auth
            .sendPasswordResetEmail(email, redirectUrl)
            .then(() => {
               resolve()
            })
            .catch((err) => {
                const resetPasswordErr = [err.message];
                reject(resetPasswordErr)
            });
    })
}