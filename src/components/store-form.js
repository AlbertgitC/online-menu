import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from './util/global-store';
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

function StoreForm(prop) {
    const [globalState, dispatch] = useContext(StoreContext);
    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (prop.action === "update") {
            for (const key in prop.selectedStore) {
                setState(s => ({ ...s, [key]: prop.selectedStore[key] }));
            };
            if (!prop.selectedStore.description) {
                setState(s => ({ ...s, description: "" }));
            };
            setState(s => ({ ...s, phoneNumber: prop.selectedStore.phoneNumber.slice(2) }));
        };
    }, [prop]);

    async function storeAction() {
        const { name, description, email } = state;

        let phoneNumber = state.phoneNumber;
        if (!phoneNumber.match(/\d+/g)) {
            phoneNumber = "";
        } else {
            phoneNumber = "+1" + phoneNumber.match(/\d+/g).join("");
        };

        if (name === "" || state.phoneNumber === "" || email === "") {
            console.log("info missing");
            setState({ ...state, err: "info missing" });
            return;
        } else if (phoneNumber.length !== 12) {
            console.log("invalid phone number");
            console.log(phoneNumber);
            setState({ ...state, err: "invalid phone number" });
            return;
        };

        const store = { name, description, phoneNumber, email };

        if (prop.action === "create") {

            try {
                await API.graphql(graphqlOperation(mutations.createStore, { input: store }))
                    .then(newStore => {
                        if (globalState.stores[0]) {
                            const currentStores = globalState.stores;
                            currentStores.push(newStore.data.createStore);
                            dispatch({
                                type: 'SET_STORES',
                                payload: currentStores
                            });
                            console.log("store created", newStore);
                        } else {
                            dispatch({
                                type: 'SET_STORES',
                                payload: [newStore.data.createStore]
                            });
                            prop.updateSelectStore(newStore.data.createStore);
                            console.log("store created", newStore);
                        };
                    });
                prop.modalAction({ component: "" });
            } catch (error) {
                console.log("error on creating store", error);
                setState({ ...state, err: error });
            };
        } else if (prop.action === "update") {
            store.id = state.id;
            try {
                await API.graphql(graphqlOperation(mutations.updateStore, { input: store }))
                    .then(newStore => {
                        prop.updateSelectStore(newStore.data.updateStore);
                        const currentStores = globalState.stores;
                        currentStores.splice(state.idx, 1, newStore.data.updateStore);
                        dispatch({
                            type: 'SET_STORES',
                            payload: currentStores
                        });
                        console.log("store updated", newStore);
                    });
                prop.modalAction({ component: "" });
            } catch (error) {
                console.log("error on updating store", error);
                setState({ ...state, err: error });
            };
        };
    };

    function handleInput(e) {
        setState({ ...state, [e.target.name]: e.target.value });
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
                <p>Store Name:</p>
                <input
                    name='name'
                    onChange={handleInput}
                    value={state.name}
                    placeholder='store name'
                />
                <p>Store Description:</p>
                <input
                    name='description'
                    onChange={handleInput}
                    value={state.description}
                    placeholder='description'
                />
                <p>Store Phone Number:</p>
                <input
                    name='phoneNumber'
                    onChange={handleInput}
                    value={state.phoneNumber}
                    placeholder='phone number'
                />
                <p>Store Email:</p>
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