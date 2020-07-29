import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import Modal from './modal/modal';
import SignIn from './sign-in';
import './header.css';

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

let lastScrollPos = 0;
let turnWhite = false;

window.addEventListener('scroll', function (e) {
    // lastScrollPos = window.scrollY;
    if (window.scrollY !== 0 && !turnWhite) {
        const header = document.getElementById("header");
        header.style.animation = "increase 0.3s forwards";
        header.style.color = "#00CED1";
        turnWhite = true;
    } else if (turnWhite && window.scrollY === 0) {
        const header = document.getElementById("header");
        header.style.animation = "fade 0.3s forwards";
        header.style.color = "#ffffff";
        turnWhite = false;
    };

});

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
        <div className="header" id="header">
            <div>Online Menu</div>
            <Modal component={modalState.component} />
            <div style={{ display: "flex" }}>
                <div style={{ paddingRight: "40px" }}>{state.userName}</div>
                <div onClick={authAction} id="auth-button">{authState}</div>
            </div>
        </div>
    );
};

export default Header;