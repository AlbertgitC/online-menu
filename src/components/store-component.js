import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import './store-component.css';
import Modal from './modal/modal';
import StoreForm from './store-form';
import LocationForm from './location-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function StoreComponent(prop) {
    const [stores, updateStores] = useState([]);
    const [selectedStore, updateSelectStore] = useState({});
    const [modalState, updateModal] = useState({ component: "" });
    const [locations, updateLocations] = useState([]);
    const [selectedLocations, updateSelectLocations] = useState([]);

    useEffect(() => {
        console.log(prop.currentUser);
        async function getStores() {
            try {
                return await API.graphql({
                    query: queries.storesByCreatedDate,
                    variables: {
                        createdBy: prop.currentUser.username, sortDirection: "ASC" 
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
                        createdBy: prop.currentUser.username
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
        getStores()
            .then(res => {
                if (isSubscribed) {
                    console.log('storeData:', res);
                    updateStores(res.data.storesByCreatedDate.items);
                    const selected = res.data.storesByCreatedDate.items[0] ? res.data.storesByCreatedDate.items[0] : {};
                    updateSelectStore({ ...selected, idx: 0 });
                    getLocations().then(locations => {
                            console.log('locationData:', locations);
                        updateLocations(locations.data.listLocations.items);
                        initSelectedLocations(selected.id, locations.data.listLocations.items);
                        })
                        .catch(locationsError => (isSubscribed ? console.log('error fetching locations', locationsError) : null));
                } else { return null };
            })
            .catch(error => (isSubscribed ? console.log('error fetching stores', error) : null));
        return () => (isSubscribed = false);
    },[prop]);

    function createStoreForm() {
        updateModal({ component: <StoreForm 
            modalAction={updateModal}
            updateStores={updateStores}
            stores={stores}
            action="create"
        /> });
    };

    function updateStoreForm() {
        updateModal({
            component: <StoreForm
                modalAction={updateModal}
                updateSelectStore={updateSelectStore}
                updateStores={updateStores}
                stores={stores}
                selectedStore={selectedStore}
                action="update"
            />
        });
    };

    function setSelectedStore(idx,e) {
        const selected = stores[idx];
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
                <ul>
                    {
                        stores.map((store, idx) => (
                            <li key={idx} className="store-li" onClick={(e) => setSelectedStore(idx,e)}>
                                <h3>{store.name}</h3>
                            </li>
                        ))
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
                    <div className="edit-button" onClick={updateStoreForm}>Edit</div>
                </div>
                <div className="user-panel-detail">Locations
                    <ul>
                        {
                            selectedLocations.map((location, idx) => (
                                <li key={idx} className="location-li">
                                    <p>{location.address}</p>
                                    <p>{location.description}</p>
                                    <p>{location.phoneNumber}</p>
                                    <p>{location.email}</p>
                                    <div onClick={() => updateLocationForm(idx)}>Edit</div>
                                </li>
                            ))
                        }
                        <li onClick={createLocationForm}>
                            <FontAwesomeIcon icon={faPlus} />
                        </li>
                    </ul>
                </div>
            </div>
            <Modal component={modalState.component} />
        </div>
    );
};

export default StoreComponent;