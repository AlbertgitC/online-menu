import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const initialState = {
    email: "",
    password: "",
    name: "",
    phone_number: "",
    err: ""
};

const initialConfirm = {
    username: "",
    code: ""
};


function SignupForm() {
    const [state, updateState] = useState(initialState);
    const { email, password, name, phone_number, err } = state;

    const [confirmState, updateConfirm] = useState(initialConfirm);
    const { username, code } = confirmState;

    async function signUp() {
        if (email === "" || password === "" || name === "" || phone_number === "") {
            updateState({ ...state, err: "info missing" });
            return;
        };

        try {
            const user = await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    name: name,
                    phone_number: phone_number
                }
            });
            console.log({ user });
            updateConfirm({ ...confirmState, username: email });
            updateState(initialState);
        } catch (error) {
            console.log('error signing up:', error);
            updateState({ ...state, err: error.message });
        }
    }

    async function confirmSignUp() {
        try {
            await Auth.confirmSignUp(username, code);
            console.log("confirmed");
            updateConfirm(initialConfirm);
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }

    function handleInput(e) {
        updateState({ ...state, [e.target.name]: e.target.value });
    };

    function handleConfirm(e) {
        updateConfirm({ ...confirmState, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <input
                name='email'
                type='email'
                onChange={handleInput}
                value={email}
                placeholder='Email'
            />
            <input
                name='password'
                type='password'
                onChange={handleInput}
                value={password}
                placeholder='Password'
            />
            <input
                name='name'
                onChange={handleInput}
                value={name}
                placeholder='User Name'
            />
            <input
                name='phone_number'
                onChange={handleInput}
                value={phone_number}
                placeholder='Phone Number'
            />
            <button onClick={signUp}>Create User</button>
            <div>{err}</div>
            <div>
                <input
                    name='username'
                    type='email'
                    onChange={handleConfirm}
                    value={username}
                    placeholder='Email'
                />
                <input
                    name='code'
                    onChange={handleConfirm}
                    value={code}
                    placeholder='Confirmation Code'
                />
                <button onClick={confirmSignUp}>Confirm User</button>
            </div>
        </div>
    );
};

export default SignupForm;