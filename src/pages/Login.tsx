import React, {FC} from 'react';
import {auth, provider} from "../config/firebase";
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from "react-router-dom";

interface Props {
}

const Login: FC<Props> = () => {
    const navigate = useNavigate()

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider)
        navigate('/')
    }

    return (
        <div className={'page'}>
            <div className={'sign-in'}>
                <p>Sign in with <span className={'google'}>Google</span> to Continue</p>
                <button onClick={signInWithGoogle} className={'sign-in-btn'}>Sign In</button>
            </div>
        </div>
    );
};

export default Login;
