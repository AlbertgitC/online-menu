import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const initialState = {
    email: "",
    code: "",
    err: ""
};

function ResendConfirm() {
    const [state, updateState] = useState(initialState);
    const { email, code, err } = state;


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

    return (
        <div>
            <form>
                <input
                    name='username'
                    onChange={handleConfirm}
                    value={username}
                    placeholder='Email'
                />
                <button onClick={resendConfirm}>Resend Confirmation</button>
            </form>
            <div>{err}</div>
        </div>
    );
};

export default ResendConfirm;