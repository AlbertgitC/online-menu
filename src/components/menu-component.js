import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from './util/global-store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCog } from '@fortawesome/free-solid-svg-icons'
import Modal from './modal/modal';
import './menu-component.css';

function MenuComponent() {
    const [storesData, dispatch] = useContext(StoreContext);
    const [selectedStore, setStore] = useState({});
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setLocation] = useState({});
    const [modalState, updateModal] = useState({ component: "" });

    useEffect(() => {
        function initSelectedLocations(storeId, locationsArr) {
            if (!locationsArr[0]) return;

            const selectedLocations = [];

            for (const location of locationsArr) {
                if (location.storeId === storeId) { selectedLocations.push(location); };
            };

            selectedLocations.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt);
            });

            setLocations(selectedLocations);
        };

        if (storesData.stores && storesData.stores[0] && !selectedStore.id) {
            setStore(storesData.stores[0]);
            initSelectedLocations(storesData.stores[0].id, storesData.locations);
        };

        if (locations[0] && !selectedLocation.id) {
            setLocation(locations[0]);
        };

        const storeDropdown = document.getElementsByClassName("store-list");
        if (storeDropdown[0]) {
            storeDropdown[0].addEventListener('mouseleave', e => {
                storeDropdown[0].style.display = "none";
            });
        };
    }, [storesData, locations]);

    function selectLocation(idx, event) {
        setLocation(locations[idx]);
        const locationLis = document.getElementsByClassName("location-li");
        for (let i = 0; i < locationLis.length; i++) {
            locationLis[i].style.backgroundColor = "#242526";
        };
        event.currentTarget.style.backgroundColor = "#000000";

        // setSelectedLocations(selected.id);
    };

    function changeStore() {

    };

    function showStoreList() {
        const menu = document.getElementsByClassName("store-list");
        menu[0].style.display = "block";
    }

    return (
        <div className="menu-wrapper">
            <div className="side-panel">
                <ul className="location-ul">
                    {
                        selectedStore.id && !locations[0] ?
                            <div>Add Location</div> : <></>
                    }
                    {
                        locations[0] ?
                            locations.map((location, idx) => (
                                <li key={idx} className="location-li" onClick={(e) => selectLocation(idx, e)}>
                                    <h3>{location.address}</h3>
                                </li>
                            )) : <></>
                    }
                    {
                        selectedStore.id ?
                            <li>
                                <FontAwesomeIcon icon={faPlus} />
                            </li> : <></>
                    }
                </ul>
            </div>
            <div className="user-panel-main">
                <div className="user-panel-header">
                    {
                        selectedStore.id ?
                            <div className="menu-head">
                                <div>
                                    <h1>{selectedStore.name}</h1>
                                    <div className="change-store" onClick={showStoreList}>Change Store
                                        <ul className="store-list">
                                            {
                                                storesData.stores.map((store, idx) => (
                                                    <li key={idx} className="menu-store-li" onClick={changeStore}>
                                                        {store.name}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>    
                                <h2>{selectedLocation.address}</h2>
                                <p>{selectedLocation.description}</p>
                                <p>{selectedLocation.phoneNumber}</p>
                                <p>{selectedLocation.email}</p>
                            </div>
                            : <div className="menu-head"></div>
                    }
                    {
                        selectedLocation.id ?
                            <div className="edit-button">Edit Location</div>
                            : <></>
                    }
                </div>
                <div className="user-panel-detail">Menu:
                    <ul className="menu">
                        <li>some categories</li>
                        {/* {
                            selectedLocations.map((location, idx) => (
                                <li key={idx} className="location-li">
                                    <p>{location.address}</p>
                                    <p>{location.description}</p>
                                    <p>{location.phoneNumber}</p>
                                    <p>{location.email}</p>
                                    <FontAwesomeIcon icon={faCog} onClick={() => updateLocationForm(idx)} />
                                </li>
                            ))
                        }
                        {
                            selectedStore.id ?
                                <li onClick={createLocationForm}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </li>
                                : <div></div>
                        } */}
                    </ul>
                </div>
            </div>
            <Modal component={modalState.component} />
        </div>
    );
};

export default MenuComponent;