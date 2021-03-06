import React, { useState, useEffect, useContext } from 'react';
import { StoreContext, UserContext } from './util/global-store';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import './store-component.css';
import Modal from './modal/modal';
import StoreForm from './store-form';
import LocationForm from './location-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCog } from '@fortawesome/free-solid-svg-icons'

function StoreComponent() {
    const [authState, authDispatch] = useContext(UserContext);
    const [globalState, dispatch] = useContext(StoreContext);
    const [selectedStore, updateSelectStore] = useState({});
    const [modalState, updateModal] = useState({ component: "" });
    const [selectedLocations, updateSelectLocations] = useState([]);

    useEffect(() => {
        async function getStores() {
            try {
                return await API.graphql({
                    query: queries.storesByCreatedDate,
                    variables: {
                        createdBy: authState.user.username, sortDirection: "ASC"
                    }
                });
            } catch (err) {
                return err;
            };
        };

        async function getLocations() {
            try {
                return await API.graphql({
                    query: queries.listLocations,
                    variables: {
                        filter: { createdBy: { eq: authState.user.username } }
                    }
                });
            } catch (err) {
                return err;
            };
        };

        async function getItems() {
            try {
                return await API.graphql({
                    query: queries.listItems,
                    variables: {
                        filter: { createdBy: { eq: authState.user.username } }
                    }
                });
            } catch (err) {
                return err;
            };
        };

        const storesData = getStores();
        const locationsData = getLocations();
        const itemsData = getItems();

        let isSubscribed = true;
        
        if (isSubscribed && globalState.stores === null) {
            Promise.all([storesData, locationsData, itemsData]).then(res => {
                console.log('storeData:', res[0]);
                dispatch({
                    type: 'SET_STORES',
                    payload: res[0].data.storesByCreatedDate.items
                });
                console.log('locationData:', res[1]);
                dispatch({
                    type: 'SET_LOCATIONS',
                    payload: res[1].data.listLocations.items
                });
                console.log('itemData:', res[2]);
                dispatch({
                    type: 'SET_ITEMS',
                    payload: res[2].data.listItems.items
                });
            }).catch(errors => {
                console.log('error fetching stores', errors[0]);
                console.log('error fetching locations', errors[1]);
                console.log('error fetching items', errors[2]);
            });
        };
        
        return () => (isSubscribed = false);
    }, [dispatch, authState, globalState]);

    useEffect(() => {
        function initSelectedLocations(id, locationsArr) {
            if (!locationsArr[0]) return;

            const selectedLocations = [];

            for (const location of locationsArr) {
                if (location.storeId === id) { selectedLocations.push(location); };
            };

            selectedLocations.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt);
            });

            updateSelectLocations(selectedLocations);
        };

        const selected = globalState.stores && globalState.stores[0] ? 
            globalState.stores[0] : {};
        const locationsData = globalState.locations ?
            globalState.locations : [];

        if (!selectedStore.id && selected.id) {
            updateSelectStore({ ...selected, idx: 0 });
        };
        
        initSelectedLocations(selectedStore.id, locationsData);
        
    }, [globalState, selectedStore]);

    function createStoreForm() {
        updateModal({ component: <StoreForm 
            modalAction={updateModal}
            updateSelectStore={updateSelectStore}
            action="create"
        /> });
    };

    function updateStoreForm() {
        updateModal({
            component: <StoreForm
                modalAction={updateModal}
                updateSelectStore={updateSelectStore}
                selectedStore={selectedStore}
                action="update"
            />
        });
    };

    function setSelectedStore(idx,e) {
        const selected = globalState.stores[idx];
        updateSelectStore({ ...selected, idx: idx });
        const storeLis = document.getElementsByClassName("store-li");
        for (let i = 0; i < storeLis.length; i++) {
            storeLis[i].style.backgroundColor = "#242526";
        };
        e.currentTarget.style.backgroundColor = "#000000";

        setSelectedLocations(selected.id);
    };

    function createLocationForm() {
        updateModal({
            component: <LocationForm
                storeId={selectedStore.id}
                modalAction={updateModal}
                updateSelectLocations={updateSelectLocations}
                selectedLocations={selectedLocations}
                action="create"
            />
        });
    };

    function updateLocationForm(idx) {
        updateModal({
            component: <LocationForm
                modalAction={updateModal}
                updateSelectLocations={updateSelectLocations}
                selectedLocations={selectedLocations}
                targetLocationIdx={idx}
                action="update"
            />
        });
    };

    function setSelectedLocations(id) {
        const selectedLocations = [];

        for (const location of globalState.locations) {
            if (location.storeId === id) { selectedLocations.push(location); };
        };

        selectedLocations.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });

        updateSelectLocations(selectedLocations);
    };

    return (
        <div className="store-wrapper">
            <div className="side-panel">
                <ul className="stores-ul">
                    {
                        globalState.stores && globalState.stores[0]?
                        globalState.stores.map((store, idx) => (
                            <li key={idx} className="store-li" onClick={(e) => setSelectedStore(idx,e)}>
                                <h3>{store.name}</h3>
                            </li>
                        )) : <div>Create Store</div>
                    }
                    <li onClick={createStoreForm}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </li>
                </ul>
                <div onClick={createStoreForm}>Add Store</div>
            </div>
            <div className="user-panel-main">
                <div>
                    <div>
                        <div className="store-head">
                            <h1>{selectedStore.name}</h1>
                            <p>{selectedStore.description}</p>
                        </div>
                        <p>{selectedStore.phoneNumber}</p>
                        <p>{selectedStore.email}</p>
                    </div>
                    {
                        selectedStore.id ?
                            <div className="edit-button" onClick={updateStoreForm}>Edit</div>
                            : <div></div>
                    }
                </div>
                <div className="user-panel-detail">Locations:
                    <ul className="locations-ul">
                        {
                            selectedLocations.map((location, idx) => (
                                <li key={idx} className="location-li">
                                    <p>{location.address}</p>
                                    <p>{location.description}</p>
                                    <p>{location.phoneNumber}</p>
                                    <p>{location.email}</p>
                                    <FontAwesomeIcon icon={faCog} onClick={() => updateLocationForm(idx)}/>
                                </li>
                            ))
                        }
                        {
                            selectedStore.id ?
                                <li onClick={createLocationForm}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </li>
                                : <div></div>
                        }
                    </ul>
                </div>
            </div>
            <Modal component={modalState.component} />
        </div>
    );
};

export default StoreComponent;