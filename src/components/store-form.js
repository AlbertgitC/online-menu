import React, { useReducer, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import './store-form.css';

const initialState = {
    name: "",
    description: "",
    phoneNumber: "",
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

    useEffect(() => {
        if (prop.action === "update") {
            for (const key in prop.selectedStore) {
                dispatch({ type: "SET_INPUT", key: key, value: prop.selectedStore[key] });
            };
            if (!prop.selectedStore.description) {
                dispatch({ type: "SET_INPUT", key: "description", value: "" });
            };
            dispatch({ type: "SET_INPUT", key: "phoneNumber", value: prop.selectedStore.phoneNumber.slice(2) });
        };
    }, [prop]);

    async function storeAction() {
        const { name, description, email, err } = state;

        let phoneNumber = state.phoneNumber;
        if (!phoneNumber.match(/\d+/g)) {
            phoneNumber = "";
        } else {
            phoneNumber = "+1" + phoneNumber.match(/\d+/g).join("");
        };

        if (name === "" || state.phoneNumber === "" || email === "") {
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

        if (prop.action === "create") {
            if (store.description === "") {
                delete store.description;
            };

            try {
                await API.graphql(graphqlOperation(mutations.createStore, { input: store }))
                    .then(newStore => {
                        const currentStores = prop.stores;
                        currentStores.push(newStore.data.createStore);
                        prop.updateStores(currentStores);
                        console.log("store created", newStore);
                    });
                dispatch({ type: "CLEAR_INPUT" });
                prop.modalAction({ component: "" });
            } catch (error) {
                console.log("error on creating store", error);
                dispatch({ type: "SET_INPUT", key: "err", value: error });
            };
        } else if (prop.action === "update") {
            store.id = state.id;
            try {
                await API.graphql(graphqlOperation(mutations.updateStore, { input: store }))
                    .then(newStore => {
                        prop.updateSelectStore(newStore.data.updateStore);
                        const currentStores = prop.stores;
                        currentStores.splice(state.idx, 1, newStore.data.updateStore);
                        prop.updateStores(currentStores);
                        console.log("store updated", newStore);
                    });
                dispatch({ type: "CLEAR_INPUT" });
                prop.modalAction({ component: "" });
            } catch (error) {
                console.log("error on updating store", error);
                dispatch({ type: "SET_INPUT", key: "err", value: error });
            };
        };
    };

    function handleInput(e) {
        dispatch({ type: "SET_INPUT", key: e.target.name, value: e.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        storeAction();
    };

    function close() {
        prop.modalAction({ component: "" });
    };

    return (
        <div className="store-form">
            <h3>{prop.action === "create" ? "Create New Store" : "Edit Store"}</h3>
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
                    name='phoneNumber'
                    onChange={handleInput}
                    value={state.phoneNumber}
                    placeholder='phone number'
                />
                <input
                    name='email'
                    onChange={handleInput}
                    value={state.email}
                    placeholder='email'
                />
                <button>{prop.action === "create" ? "Create Store" : "Save Changes"}</button>
            </form>
            <div>{state.err}</div>
            <button onClick={close}>Cancel</button>
        </div>
    );
};

export default StoreForm;