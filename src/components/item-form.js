import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from './util/global-store';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import './item-form.css';

const initialState = {
    storeId: "",
    name: "",
    price: "",
    description: "",
    err: ""
};

function ItemForm(prop) {
    const [storeData, dispatch] = useContext(StoreContext);
    const [state, setState] = useState(initialState);

    useEffect(() => {
        setState(s => ({ ...s, storeId: prop.storeId }));
        // if (prop.action === "update") {
        //     const targetLocation = prop.selectedLocations[prop.targetLocationIdx];
        //     for (const key in targetLocation) {
        //         setState(s => ({ ...s, [key]: targetLocation[key] }));
        //     };
        //     setState(s => ({ ...s, phoneNumber: targetLocation.phoneNumber.slice(2) }));
        // };
    }, [prop]);

    async function itemAction() {
        const { storeId, name, description } = state;

        let price = state.price;
        const priceMatch = price.match(/^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/);
        if (priceMatch) {
            price = parseFloat(priceMatch[0]);
        } else {
            price = "";
        };
        
        if (name === "") {
            console.log("name missing");
            setState({ ...state, err: "name missing" });
            return;
        } else if (typeof price !== "number") {
            console.log("invalid price");
            console.log(price);
            setState({ ...state, err: "invalid price, at most 2 decimals" });
            return;
        };

        const item = { storeId, name, price, description };

        if (prop.action === "create") {
            try {
                await API.graphql(graphqlOperation(mutations.createItem, { input: item }))
                    .then(newItem => {
                        // const currentLocations = prop.selectedLocations;
                        const allItems = storeData.items;
                        allItems.push(newItem.data.createItem);
                        // prop.updateSelectLocations(currentLocations);
                        // allLocations.push(newLocation.data.createLocation);
                        dispatch({
                            type: 'SET_ITEMS',
                            payload: allItems
                        });
                        console.log("item created", newItem);
                    });
                prop.modalAction({ component: "" });
            } catch (error) {
                console.log("error on creating item", error);
                setState({ ...state, err: error });
            };
        } else if (prop.action === "update") {
            // location.id = state.id;
            // try {
            //     await API.graphql(graphqlOperation(mutations.updateLocation, { input: location }))
            //         .then(newLocation => {
            //             const allLocations = storeData.locations;
            //             for (let i = 0; i < allLocations.length; i++) {
            //                 if (allLocations[i].id === location.id) {
            //                     allLocations.splice(i, 1, newLocation.data.updateLocation);
            //                     dispatch({
            //                         type: 'SET_LOCATIONS',
            //                         payload: allLocations
            //                     });
            //                     break
            //                 };
            //             };
            //             const selectedLocations = prop.selectedLocations;
            //             selectedLocations.splice(prop.targetLocationIdx, 1, newLocation.data.updateLocation);
            //             prop.updateSelectLocations(selectedLocations);

            //             if (prop.setLocation) {
            //                 prop.setLocation({ ...newLocation.data.updateLocation, idx: prop.targetLocationIdx });
            //             };

            //             console.log("location updated", newLocation);
            //         });
            //     prop.modalAction({ component: "" });
            // } catch (error) {
            //     console.log("error on updating location", error);
            //     setState({ ...state, err: error });
            // };
        };
    };

    function handleInput(e) {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        itemAction();
    };

    function close() {
        prop.modalAction({ component: "" });
    };

    return (
        <div className="item-form">
            <h3>{prop.action === "create" ? "Add New Item" : "Edit Item"}</h3>
            <form onSubmit={handleSubmit}>
                <p>Name:</p>
                <input
                    name='name'
                    onChange={handleInput}
                    value={state.name}
                    placeholder='name'
                />
                <p>Description:</p>
                <input
                    name='description'
                    onChange={handleInput}
                    value={state.description}
                    placeholder='description'
                />
                <p>Price:</p>
                <input
                    name='price'
                    onChange={handleInput}
                    value={state.price}
                    placeholder='item price'
                />
                <button>{prop.action === "create" ? "Create Item" : "Save Changes"}</button>
            </form>
            <div>{state.err}</div>
            <button onClick={close}>Cancel</button>
        </div>
    );
};

export default ItemForm;