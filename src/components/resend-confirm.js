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
        if (username === "") {
            updateConfirm({ ...confirmState, err: "info missing" });
            return;
        };

        try {
            await Auth.resendSignUp(username);
            updateConfirm({ ...confirmState, err: "" });
        } catch (error) {
            console.log('error resending confirm', error);
            updateConfirm({ ...confirmState, err: error.message });
        }
    }
    
};