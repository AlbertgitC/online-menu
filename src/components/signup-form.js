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

    async function signUp(e) {
        e.preventDefault();
        const phoneNumber = "+1" + phone_number.match(/\d+/g).join("");

        if (email === "" || password === "" || name === "" || phone_number === "") {
            updateState({ ...state, err: "info missing" });
            return;
        } else if (phoneNumber.length !== 12) {
            updateState({ ...state, err: "invalid phone number" });
            return;
        } else if (password.length < 8) {
            updateState({ ...state, err: "password must be 8 characters or more" });
            return;
        };

        try {
            const user = await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    name: name,
                    phone_number: phoneNumber
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
            const confirmObj = await Auth.confirmSignUp(username, code);
            updateConfirm(initialConfirm);
            updateState({ ...state, err: "" });
        } catch (error) {
            console.log('error confirming sign up', error);
            updateState({ ...state, err: error.message });
        }
    }

    async function resendConfirm() {
        try {
            const confirmObj = await Auth.resendSignUp(username);
            updateState({ ...state, err: "" });
        } catch (error) {
            console.log('error resending confirm', error);
            updateState({ ...state, err: error.message });
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
            <form onSubmit={signUp}>
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
                    autoComplete="new-password"
                />
                <input
                    name='name'
                    onChange={handleInput}
                    value={name}
                    placeholder='User Name'
                />
                <div>
                    <div>+1</div>
                    <input
                        name='phone_number'
                        onChange={handleInput}
                        value={phone_number}
                        placeholder='Phone Number'
                    />
                </div>
                <button>Create User</button>
            </form>---------
            <div>{err}</div>
            <div>---------
                <div>Confirmation Code Sent to: {username}</div>
                <input
                    name='code'
                    onChange={handleConfirm}
                    value={code}
                    placeholder='Confirmation Code'
                />
                <button onClick={confirmSignUp}>Confirm User</button>
                <button onClick={resendConfirm}>Resend Confirmation</button>
            </div>
            <div>---------
                <input
                    name='username'
                    onChange={handleConfirm}
                    value={username}
                    placeholder='Email'
                />
                <button onClick={resendConfirm}>Resend Confirmation</button>
            </div>
        </div>
    );
};

export default SignupForm;