import React, { useState, useEffect, useContext } from 'react';
import { Context } from './util/global-store';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import './store-component.css';
import Modal from './modal/modal';
import StoreForm from './store-form';
import LocationForm from './location-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCog } from '@fortawesome/free-solid-svg-icons'

function StoreComponent() {
    const [globalState, dispatch] = useContext(Context);
    // const [stores, updateStores] = useState([]);
    const [selectedStore, updateSelectStore] = useState({});
    const [modalState, updateModal] = useState({ component: "" });
    const [locations, updateLocations] = useState([]);
    const [selectedLocations, updateSelectLocations] = useState([]);

    useEffect(() => {
        async function getStores() {
            try {
                return await API.graphql({
                    query: queries.storesByCreatedDate,
                    variables: {
                        createdBy: globalState.user.username, sortDirection: "ASC"
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
                        filter: { createdBy: { eq: globalState.user.username } }
                    }
                });
            } catch (err) {
                return err;
            };
        };

        function initSelectedLocations(id, locationsArr) {
            const selectedLocations = [];

            for (const location of locationsArr) {
                if (location.storeId === id) { selectedLocations.push(location); };
            };

            selectedLocations.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt);
            });

            updateSelectLocations(selectedLocations);
        };

        let isSubscribed = true;

        if (!globalState.stores && isSubscribed) {
            getStores()
                .then(res => {
                    
                        console.log('storeData:', res);
                        dispatch({
                            type: 'GET_STORES',
                            payload: res.data.storesByCreatedDate.items
                        });
                        // updateStores(res.data.storesByCreatedDate.items);
                        // const selected = res.data.storesByCreatedDate.items[0] ? 
                        //     res.data.storesByCreatedDate.items[0] : {};
                        // updateSelectStore({ ...selected, idx: 0 });
                        // getLocations().then(locations => {
                        //         console.log('locationData:', locations);
                        //     updateLocations(locations.data.listLocations.items);
                        //     initSelectedLocations(selected.id, locations.data.listLocations.items);
                        //     })
                        //     .catch(locationsError => (isSubscribed ?
                        //         console.log('error fetching locations', locationsError) : null));
                })
                .catch(error => {
                    console.log('error fetching stores', error);
                });
        };
        
        return () => (isSubscribed = false);
    }, [globalState, dispatch]);

    useEffect(() => {
        const selected = globalState.stores && globalState.stores[0] ? 
            globalState.stores[0] : {};
        updateSelectStore({ ...selected, idx: 0 });
    }, []);

    function createStoreForm() {
        updateModal({ component: <StoreForm 
            modalAction={updateModal}
            // updateStores={updateStores}
            updateSelectStore={updateSelectStore}
            // stores={stores}
            action="create"
        /> });
    };

    function updateStoreForm() {
        updateModal({
            component: <StoreForm
                modalAction={updateModal}
                updateSelectStore={updateSelectStore}
                // updateStores={updateStores}
                // stores={stores}
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
                updateLocations={updateLocations}
                locations={locations}
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
                updateLocations={updateLocations}
                locations={locations}
                updateSelectLocations={updateSelectLocations}
                selectedLocations={selectedLocations}
                targetLocationIdx={idx}
                action="update"
            />
        });
    };

    function setSelectedLocations(id) {
        const selectedLocations = [];

        for (const location of locations) {
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