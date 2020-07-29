import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const initialState = {
    email: "",
    err: ""
};

function ResendConfirm() {
    const [state, updateState] = useState(initialState);
    const { email, err } = state;


    async function resendConfirm() {
        if (email === "") {
            updateState({ ...state, err: "info missing" });
            return;
        };

        try {
            await Auth.resendSignUp(email);
            updateState({ ...state, err: "" });
        } catch (error) {
            console.log('error resending confirm', error);
            updateState({ ...state, err: error.message });
        }
    }

    function handleInput(e) {
        updateState({ ...state, [e.target.name]: e.target.value });
    };

    return (
        <div>
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
        </div>
    );
};

export default ResendConfirm;