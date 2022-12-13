import React, {FunctionComponent} from 'react';
import {Link} from "react-router-dom";
import {auth} from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth"

interface Props {

}

const NavBar: FunctionComponent<Props> = () => {
    const [user] = useAuthState(auth)
    const signOutUser = async () => {
        await signOut(auth)
    }
    return (
        <header className={'navigation'}>

            <nav className={'navigation-items'}>
                <h1 className={'logo'}>
                    Fit Talk🏋
                </h1>
                <Link to={'/'}>
                    Homepage🏠
                </Link>
                {user ?
                    <Link to={'/create'}>
                        Create Post➕
                    </Link>
                    :
                    <Link to={'/login'}>
                        Login Page🔐
                    </Link>
                }
                {user &&
                    <>
                        <button className={'sign-out-btn'} onClick={signOutUser}>Sign Out</button>
                        <p>{`Welcome, ${user?.displayName?.split(' ')[0]}`}</p>
                        <img className={'profile-img'} src={user.photoURL || ''} alt="" width={'40'} height={'40'}/>
                    </>
                }
            </nav>
        </header>
    );
};

export default NavBar;
