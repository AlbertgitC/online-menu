import React, { useReducer } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createStore as CreateStore } from '../graphql/mutations';

const initialState = {
    name: "",
    description: "",
    phone_number: "",
    currentStore: {},
    err: ""
};

function reducer(state, action) {
    switch(action.type) {
        case "SET_STORE":
            return { ...state, currentStore: action.store };
        case "SET_INPUT":
            return { ...state, [action.key]: action.value };
        case "CLEAR_INPUT":
            return { ...initialState, currentStore: state.currentStore };
        default:
            return state;
    };
};

function StoreForm() {
    const [state, dispatch] = useReducer(reducer, initialState);

    async function creatStore() {
        const { name, description, phone_number, err } = state;

        let phoneNumber;
        if (!phone_number.match(/\d+/g)) {
            phoneNumber = "";
        } else {
            phoneNumber = "+1" + phone_number.match(/\d+/g).join("");
        };

        if (name === "" || phone_number === "") {
            console.log("info missing");
            dispatch({ type: "SET_INPUT", key: "err", value: "info missing" });
            return;
        } else if (phoneNumber.length !== 12) {
            console.log("invalid phone number");
            console.log(phoneNumber);
            dispatch({ type: "SET_INPUT", key: "err", value: "invalid phone number" });
            return;
        };

        const store = { name, description, phoneNumber };

        if (store.description === "") {
            delete store.description;
        };

        try {
            await API.graphql(graphqlOperation(CreateStore, { input: store }));
            console.log("store created");
            dispatch({ type: "SET_STORE", store });
            dispatch({ type: "CLEAR_INPUT" });
        } catch (error) {
            console.log("error on creating store", error);
        };
    };

    function handleInput(e) {
        dispatch({ type: "SET_INPUT", key: e.target.name, value: e.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        creatStore();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name='name'
                    onChange={handleInput}
                    value={state.name}
                    placeholder='name'
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
                <button>Create Store</button>
            </form>
            <div>{state.err}</div>
            <div>
                <h3>{state.currentStore.name}</h3>
                <p>{state.currentStore.description}</p>
                <p>{state.currentStore.phoneNumber}</p>
            </div>
                
        </div>
    );
};

export default StoreForm;