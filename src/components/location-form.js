import React, { useReducer, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import './location-form.css';

const initialState = {
    storeId: "",
    address: "",
    description: "",
    phoneNumber: "",
    email: "",
    err: ""
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_INPUT":
            return { ...state, [action.key]: action.value };
        case "CLEAR_INPUT":
            return { ...initialState };
        default:
            return state;
    };
};

function LocationForm(prop) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: "SET_INPUT", key: "storeId", value: prop.storeId });
        // if (prop.action === "update") {
        //     for (const key in prop.selectedStore) {
        //         dispatch({ type: "SET_INPUT", key: key, value: prop.selectedStore[key] });
        //     };
        //     if (!prop.selectedStore.description) {
        //         dispatch({ type: "SET_INPUT", key: "description", value: "" });
        //     };
        //     dispatch({ type: "SET_INPUT", key: "phoneNumber", value: prop.selectedStore.phoneNumber.slice(2) });
        // };
    }, [prop]);

    async function locationAction() {
        const { storeId, address, description, email } = state;

        let phoneNumber = state.phoneNumber;
        if (!phoneNumber.match(/\d+/g)) {
            phoneNumber = "";
        } else {
            phoneNumber = "+1" + phoneNumber.match(/\d+/g).join("");
        };

        if (address === "" || state.phoneNumber === "" || email === "") {
            console.log("info missing");
            dispatch({ type: "SET_INPUT", key: "err", value: "info missing" });
            return;
        } else if (phoneNumber.length !== 12) {
            console.log("invalid phone number");
            console.log(phoneNumber);
            dispatch({ type: "SET_INPUT", key: "err", value: "invalid phone number" });
            return;
        };

        const location = { storeId, address, description, phoneNumber, email };

        if (prop.action === "create") {
            // if (location.description === "") {
            //     delete location.description;
            // };

            try {
                await API.graphql(graphqlOperation(mutations.createLocation, { input: location }))
                    .then(newLocation => {
                        const currentLocations = prop.selectedLocations;
                        const allLocations = prop.locations;
                        currentLocations.push(newLocation.data.createLocation);
                        prop.updateSelectLocations(currentLocations);
                        allLocations.push(newLocation.data.createLocation);
                        prop.updateLocations(allLocations);
                        console.log("location created", newLocation);
                    });
                dispatch({ type: "CLEAR_INPUT" });
                prop.modalAction({ component: "" });
            } catch (error) {
                console.log("error on creating location", error);
                dispatch({ type: "SET_INPUT", key: "err", value: error });
            };
        };
    };

    function handleInput(e) {
        dispatch({ type: "SET_INPUT", key: e.target.name, value: e.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        locationAction();
    };

    function close() {
        prop.modalAction({ component: "" });
    };

    return (
        <div className="location-form">
            <h3>{prop.action === "create" ? "Add New Location" : "Edit Location"}</h3>
            <form onSubmit={handleSubmit}>
                <p>Address:</p>
                <input
                    name='address'
                    onChange={handleInput}
                    value={state.address}
                    placeholder='address'
                />
                <p>Location Description:</p>
                <input
                    name='description'
                    onChange={handleInput}
                    value={state.description}
                    placeholder='description'
                />
                <p>Location Phone Number:</p>
                <input
                    name='phoneNumber'
                    onChange={handleInput}
                    value={state.phoneNumber}
                    placeholder='phone number'
                />
                <p>Location Email:</p>
                <input
                    name='email'
                    onChange={handleInput}
                    value={state.email}
                    placeholder='email'
                />
                <button>{prop.action === "create" ? "Add Location" : "Save Changes"}</button>
            </form>
            <div>{state.err}</div>
            <button onClick={close}>Cancel</button>
        </div>
    );
};

export default LocationForm;