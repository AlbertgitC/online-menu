import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Modal from './modal/modal';
import './signup-form.css'

const initialState = {
    email: "",
    password: "",
    name: "",
    phone_number: "",
    err: ""
};

const initialConfirm = {
    username: "",
    code: "",
    err: ""
};

export function SignupForm() {
    const [state, updateState] = useState(initialState);
    const { email, password, name, phone_number, err } = state;

    const [modalState, updateModal] = useState({ component: "" });

    async function signUp(e) {
        e.preventDefault();

        let phoneNumber;
        if (!phone_number.match(/\d+/g)) {
            phoneNumber = "";
        } else {
            phoneNumber = "+1" + phone_number.match(/\d+/g).join("");
        };

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
            
            updateModal({ component: <ConfirmSignUp 
                usernameProp={email} modalAction={updateModal}/> });
            updateState(initialState);
        } catch (error) {
            console.log('error signing up:', error);
            updateState({ ...state, err: error.message });
        }
    }

    function handleInput(e) {
        updateState({ ...state, [e.target.name]: e.target.value });
    };

    return (
        <div className="sign-up">
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
                <div className="phone-input">
                    <div id="add-one">+1</div>
                    <input
                        name='phone_number'
                        onChange={handleInput}
                        value={phone_number}
                        placeholder='Phone Number'
                    />
                </div>
                <button>Create User</button>
            </form>
            <div>{err}</div>
            <Modal component={modalState.component}/>
        </div>
    );
};

export function ConfirmSignUp(prop) {
    const [confirmState, updateConfirm] = useState({ ...initialConfirm, 
        username: prop.usernameProp });
    const { username, code, err } = confirmState;

    async function confirmSignUp() {
        if (code === "") {
            updateConfirm({ ...confirmState, err: "info missing" });
            return;
        };

        try {
            await Auth.confirmSignUp(username, code);
            updateConfirm(initialConfirm);
            prop.modalAction({ component: "" });
        } catch (error) {
            console.log('error confirming sign up', error);
            updateConfirm({ ...confirmState, err: error.message });
        }
    }

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

    function handleConfirm(e) {
        updateConfirm({ ...confirmState, [e.target.name]: e.target.value });
    };
    
    return (
        <div>
            <div>Confirmation Code Sent to: {username}</div>
            <input
                name='code'
                onChange={handleConfirm}
                value={code}
                placeholder='Confirmation Code'
            />
            <button onClick={confirmSignUp}>Confirm User</button>
            <button onClick={resendConfirm}>Resend Confirmation</button>
            <div>{err}</div>
        </div>
    );
};