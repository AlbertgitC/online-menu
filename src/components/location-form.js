import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from './util/global-store';
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

function LocationForm(prop) {
    const [storeData, dispatch] = useContext(StoreContext);
    const [state, setState] = useState(initialState);

    useEffect(() => {
        setState(s => ({ ...s, storeId: prop.storeId }));
        if (prop.action === "update") {
            const targetLocation = prop.selectedLocations[prop.targetLocationIdx];
            for (const key in targetLocation) {
                setState(s => ({ ...s, [key]: targetLocation[key] }));
            };
            setState(s => ({ ...s, phoneNumber: targetLocation.phoneNumber.slice(2) }));
        };
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
            setState({ ...state, err: "info missing" });
            return;
        } else if (phoneNumber.length !== 12) {
            console.log("invalid phone number");
            console.log(phoneNumber);
            setState({ ...state, err: "invalid phone number" });
            return;
        };

        const location = { storeId, address, description, phoneNumber, email };

        if (prop.action === "create") {
            try {
                await API.graphql(graphqlOperation(mutations.createLocation, { input: location }))
                    .then(newLocation => {
                        const currentLocations = prop.selectedLocations;
                        const allLocations = storeData.locations;
                        currentLocations.push(newLocation.data.createLocation);
                        prop.updateSelectLocations(currentLocations);
                        allLocations.push(newLocation.data.createLocation);
                        dispatch({
                            type: 'SET_LOCATIONS',
                            payload: allLocations
                        });
                        console.log("location created", newLocation);
                    });
                prop.modalAction({ component: "" });
            } catch (error) {
                console.log("error on creating location", error);
                setState({ ...state, err: error });
            };
        } else if (prop.action === "update") {
            location.id = state.id;
            try {
                await API.graphql(graphqlOperation(mutations.updateLocation, { input: location }))
                    .then(newLocation => {
                        const allLocations = storeData.locations;
                        for (let i = 0; i < allLocations.length; i++) {
                            if (allLocations[i].id === location.id) {
                                allLocations.splice(i, 1, newLocation.data.updateLocation);
                                dispatch({
                                    type: 'SET_LOCATIONS',
                                    payload: allLocations
                                });
                                break
                            };
                        };
                        const selectedLocations = prop.selectedLocations;
                        selectedLocations.splice(prop.targetLocationIdx, 1, newLocation.data.updateLocation);
                        prop.updateSelectLocations(selectedLocations);

                        if (prop.setLocation) {
                            prop.setLocation({ ...newLocation.data.updateLocation, idx: prop.targetLocationIdx });
                        };

                        console.log("location updated", newLocation);
                    });
                prop.modalAction({ component: "" });
            } catch (error) {
                console.log("error on updating location", error);
                setState({ ...state, err: error });
            };
        };
    };

    function handleInput(e) {
        setState({ ...state, [e.target.name]: e.target.value });
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