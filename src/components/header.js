import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import Modal from './modal/modal';
import SignIn from './sign-in';

const initialState = {
    authState: "Sign In",
    userName: ""
};

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

function Header() {
    const [state, updateState] = useState(initialState);
    const { authState, userName } = state;

    const [modalState, updateModal] = useState({ component: "" });

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(res => {
                console.log("user info:", res);
                updateState({ authState: "Sign Out", userName: res.attributes.name });
            })
            .catch(err => {
                console.log("error finding user:", err);
            });
    }, []);

    function authAction() {
        if (authState === "Sign In") {
            updateModal({
                component: <SignIn
                    updateHeader={updateState}
                    modalAction={updateModal}/>
            });
        } else if (authState === "Sign Out") {
            signOut();
            updateState(initialState);
        };
        
    };

    return (
        <div>
            <div>Online Menu</div>
            <div>{state.userName}</div>
            <button onClick={authAction}>{authState}</button>
            <Modal component={modalState.component} />
        </div>
    );
};

export default Header;