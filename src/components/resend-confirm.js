import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { ConfirmSignUp } from './signup-form';
import './resend-confirm.css';

const initialState = {
    email: "",
    err: ""
};

function ResendConfirm(prop) {
    const [state, updateState] = useState(initialState);
    const { email, err } = state;


    async function resendConfirm(e) {
        e.preventDefault();
        if (email === "") {
            updateState({ ...state, err: "info missing" });
            return;
        };

        try {
            await Auth.resendSignUp(email);
            prop.modalAction({ component: <ConfirmSignUp 
                usernameProp={email}
                modalAction={prop.modalAction}
            /> });
        } catch (error) {
            console.log('error resending confirm', error);
            updateState({ ...state, err: error.message });
        }
    }

    function close() {
        prop.modalAction({ component: "" });
    };

    function handleInput(e) {
        updateState({ ...state, [e.target.name]: e.target.value });
    };

    return (
        <div className="resend-confirm">
            <form>
                <input
                    name='email'
                    onChange={handleInput}
                    value={email}
                    placeholder='Email'
                />
                <button onClick={resendConfirm}>Resend Confirmation</button>
            </form>
            <div>{err}</div>
            <button onClick={close}>Close</button>
        </div>
    );
};

export default ResendConfirm;