import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const initialState = {
    email: "",
    password: "",
    err: ""
};

function SignIn(prop) {
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
            prop.modalAction({ component: "" });
        } catch (error) {
            console.log('error signing in', error);
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
            <button onClick={close}>Close</button>
        </div>
    );
};

export default SignIn;