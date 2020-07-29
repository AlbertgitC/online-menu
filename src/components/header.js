import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import Modal from './modal/modal';
import SignIn from './sign-in';

// const userInfo = Auth.currentAuthenticatedUser();

const initialState = {
    authState: "Sign In",
    userName: ""
};

function Header() {
    const [state, updateState] = useState(initialState);
    const { authState, userName } = state;

    const [modalState, updateModal] = useState({ component: "" });

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(res => {
                console.log("user info:", res);
                updateState({ ...state, userName: res.attributes.name });
            })
            .catch(err => console.log("error finding user:", err));
    }, [userName]);

    function authAction() {
        updateModal({
            component: <SignIn
                modalAction={updateModal} />
        });
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