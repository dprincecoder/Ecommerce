import React from 'react'
import SignIn from '../../components/signIn/SignIn'
import './login.scss'
const Login = () => {
    window.document.title = "Login";

    return (
        <div className="login">
            <SignIn />
        </div>
    )
}

export default Login
