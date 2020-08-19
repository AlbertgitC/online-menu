import React, { useState, useEffect } from 'react';

function MenuComponent(prop) {

    return (
        <div className="menu-wrapper">
            <div className="side-panel">
                <ul className="location-ul">
                    {
                        stores[0] ?
                            stores.map((store, idx) => (
                                <li key={idx} className="store-li" onClick={(e) => setSelectedStore(idx, e)}>
                                    <h3>{store.name}</h3>
                                </li>
                            )) : <div>Create Store</div>
                    }
                    <li onClick={createStoreForm}>
                        <FontAwesomeIcon icon={faPlus} />
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
                        }
                    </ul>
                </div>
            </div>
            <Modal component={modalState.component} />
        </div>
    );
};