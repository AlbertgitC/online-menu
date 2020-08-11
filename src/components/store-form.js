import React, { useReducer } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';

const initialState = {
    name: "",
    description: "",
    phone_number: "",
    email: "",
    err: ""
};

function reducer(state, action) {
    switch(action.type) {
        case "SET_INPUT":
            return { ...state, [action.key]: action.value };
        case "CLEAR_INPUT":
            return { ...initialState };
        default:
            return state;
    };
};

function StoreForm(prop) {
    const [state, dispatch] = useReducer(reducer, initialState);

    async function creatStore() {
        const { name, description, phone_number, email, err } = state;

        let phoneNumber;
        if (!phone_number.match(/\d+/g)) {
            phoneNumber = "";
        } else {
            phoneNumber = "+1" + phone_number.match(/\d+/g).join("");
        };

        if (name === "" || phone_number === "" || email === "") {
            console.log("info missing");
            dispatch({ type: "SET_INPUT", key: "err", value: "info missing" });
            return;
        } else if (phoneNumber.length !== 12) {
            console.log("invalid phone number");
            console.log(phoneNumber);
            dispatch({ type: "SET_INPUT", key: "err", value: "invalid phone number" });
            return;
        };

        const store = { name, description, phoneNumber, email };

        if (store.description === "") {
            delete store.description;
        };

        try {
            await API.graphql(graphqlOperation(mutations.createStore, { input: store }));
            console.log("store created");
            dispatch({ type: "CLEAR_INPUT" });
        } catch (error) {
            console.log("error on creating store", error);
            dispatch({ type: "SET_INPUT", key: "err", value: error });
        };
    };

    function handleInput(e) {
        dispatch({ type: "SET_INPUT", key: e.target.name, value: e.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        creatStore();
    };

    function close() {
        prop.modalAction({ component: "" });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name='name'
                    onChange={handleInput}
                    value={state.name}
                    placeholder='store name'
                />
                <input
                    name='description'
                    onChange={handleInput}
                    value={state.description}
                    placeholder='description'
                />
                <input
                    name='phone_number'
                    onChange={handleInput}
                    value={state.phone_number}
                    placeholder='phone number'
                />
                <input
                    name='email'
                    onChange={handleInput}
                    value={state.email}
                    placeholder='email'
                />
                <button>Create Store</button>
            </form>
            <div>{state.err}</div>
            <button onClick={close}>Cancel</button>
        </div>
    );
};

export default StoreForm;