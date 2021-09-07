import React from 'react'
import { auth, provider, signInWithGoogle } from "../../firebase";
import Button from '../forms/button/Button'
import './signIn.scss'


const SignIn = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

 
    return (
        <div className="signIn">
            <div className="wrap">
                <h2>Login</h2>

                <div className="formGrap">
                    <form onSubmit={handleSubmit}>
                        <div className="socialSign">
                            <div className="row">
                                <Button onClick={signInWithGoogle}>
                                    Sign In with Google
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
