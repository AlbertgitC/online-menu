import React, { useReducer, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createStore as CreateStore } from '../graphql/mutations';
import { withAuthenticator } from 'aws-amplify-react'

const initialState = {
    name: "",
    description: "",
    phoneNumber: "",
    streetAddress: "",
    zipCode: "",
    usState: "",
    subMenu: ["rootMenu"],
    currentStore: {}
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
        const { name, description, phoneNumber, streetAddress, zipCode, 
            usState, subMenu } = state;

        if (name === "" || phoneNumber === "" || streetAddress === "" || 
        zipCode === "" || usState === "") {
            console.log("info missing");
            return;
        };

        const store = {
            name, description, phoneNumber, streetAddress, zipCode,
            usState, subMenu };

        if (store.description === "") {
            delete store.description;
        };

        try {
            await API.graphql(graphqlOperation(CreateStore, { input: store }));
            console.log("store created");
            dispatch({ type: "SET_STORE", store });
            dispatch({ type: "CLEAR_INPUT" });
        } catch (err) {
            console.log(`error on creating store, ${err}`);
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
                    name='phoneNumber'
                    onChange={handleInput}
                    value={state.phoneNumber}
                    placeholder='phone number'
                />
                <input
                    name='streetAddress'
                    onChange={handleInput}
                    value={state.streetAddress}
                    placeholder='street address'
                />
                <input
                    name='zipCode'
                    onChange={handleInput}
                    value={state.zipCode}
                    placeholder='zip code'
                />
                <input
                    name='usState'
                    onChange={handleInput}
                    value={state.usState}
                    placeholder='US state'
                />
                <button>Create Store</button>
            </form>
            <div>
                <h3>{state.currentStore.name}</h3>
                <p>{state.currentStore.description}</p>
                <p>{state.currentStore.phoneNumber}</p>
                <p>{state.currentStore.streetAddress}</p>
                <p>{state.currentStore.usState} {state.currentStore.zipCode}</p>
            </div>
                
        </div>
    );
};

export default StoreForm;