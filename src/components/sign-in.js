import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Modal from './modal/modal';

const initialState = {
    email: "",
    password: "",
    err: ""
};

function SignIn() {
    const [state, updateState] = useState(initialState);
    const { email, password, err } = state;

    async function signIn(e) {
        e.preventDefault();
        if (email === "" || password === "") {
            updateState({ ...state, err: "info missing" });
            return;
        };

        try {
            const user = await Auth.signIn(email, password);
            console.log(user);
            updateState(initialState);
        } catch (error) {
            console.log('error signing in', error);
            updateState({ ...state, err: error.message });
        }
    }

    function handleInput(e) {
        updateState({ ...state, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={signIn}>
                <input
                    name='email'
                    type='email'
                    onChange={handleInput}
                    value={email}
                    placeholder='Email'
                    autoComplete="username"
                />
                <input
                    name='password'
                    type='password'
                    onChange={handleInput}
                    value={password}
                    placeholder='Password'
                    autoComplete="password"
                />
                <button>Sign In</button>
            </form>
            <div>{err}</div>
            <div>Resend Confirmation</div>
        </div>
    );
};

export default SignIn;