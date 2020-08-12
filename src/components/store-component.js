import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import './store-component.css';
import Modal from './modal/modal';
import StoreForm from './store-form';

function StoreComponent(prop) {
    const [stores, updateStores] = useState([]);
    const [selectedStore, updateSelectStore] = useState({});
    const [modalState, updateModal] = useState({ component: "" });

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
                }
            }

        let isSubscribed = true;
        getStores()
            .then(res => {
                if (isSubscribed) {
                    console.log('storeData:', res);
                    updateStores(res.data.storesByCreatedDate.items);
                    const selected = res.data.storesByCreatedDate.items[0] ? res.data.storesByCreatedDate.items[0] : {};
                    updateSelectStore(selected);
                } else { return null };
            })
            .catch(error => (isSubscribed ? console.log('error fetching stores', error) : null));
        return () => (isSubscribed = false);
    }, [prop]);

    function openStoreForm() {
        updateModal({ component: <StoreForm 
            modalAction={updateModal}
            updateStores={updateStores}
            stores={stores}
        /> });
    };

    function setSelectedStore(idx,e) {
        const selected = stores[idx];
        updateSelectStore(selected);
        const storeLis = document.getElementsByClassName("store-li");
        for (let i = 0; i < storeLis.length; i++) {
            storeLis[i].style.backgroundColor = "#242526";
        };
        e.currentTarget.style.backgroundColor = "#000000";
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
                    <li onClick={openStoreForm}>+</li>
                </ul>
                <div onClick={openStoreForm}>Add Store</div>
            </div>
            <div className="user-panel-main">
                <div>
                    <h1>{selectedStore.name}</h1>
                    <div>Edit</div>
                </div>
                <div>
                    <p>{selectedStore.description}</p>
                    <p>{selectedStore.phoneNumber}</p>
                    <p>{selectedStore.email}</p>
                </div>
                <div className="user-panel-detail">Locations</div>
            </div>
            <Modal component={modalState.component} />
        </div>
    );
};

export default StoreComponent;