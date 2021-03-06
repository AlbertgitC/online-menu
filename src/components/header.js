import React, { useState, useEffect } from 'react';
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

let turnWhite = false;

function Header(prop) {
    const [state, updateState] = useState(initialState);
    const { authState, userName } = state;

    const [modalState, updateModal] = useState({ component: "" });

    useEffect(() => {
        const scrollDown = (e) => {
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
        };
        window.addEventListener('scroll', scrollDown, false);

        return () => { window.removeEventListener('scroll', scrollDown, false); };
    }, []);

    function authAction() {
        if (authState === "Sign In") {
            updateModal({
                component: <SignIn
                    setUser={prop.setUser}
                    modalAction={updateModal}/>
            });
        } else if (authState === "Sign Out") {
            signOut();
            updateState(initialState);
        };
        
    };

    // window.addEventListener('scroll', function (e) {
    //     if (window.scrollY !== 0 && !turnWhite) {
    //         const header = document.getElementById("header");
    //         header.style.animation = "increase 0.3s forwards";
    //         header.style.color = "#00CED1";
    //         turnWhite = true;
    //     } else if (turnWhite && window.scrollY === 0) {
    //         const header = document.getElementById("header");
    //         header.style.animation = "fade 0.3s forwards";
    //         header.style.color = "#ffffff";
    //         turnWhite = false;
    //     };
    // });

    return (
        <div>
            <div className="header" id="header">
                <div id="logo">Online Menu</div>
                <div className="auth-block">
                    <div style={{ paddingRight: "26px" }}>{state.userName}</div>
                    <div onClick={authAction} id="auth-button">{authState}</div>
                </div>
            </div>
            <Modal component={modalState.component} />
        </div>
    );
};

export default Header;