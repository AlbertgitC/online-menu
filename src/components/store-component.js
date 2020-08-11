import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listStores as ListStores } from '../graphql/queries';
import './store-component.css';
import Modal from './modal/modal';

function StoreComponent(prop) {
    const [stores, updateStores] = useState([]);
    const [selectedStore, updateSelectStore] = useState({});
    const [modalState, updateModal] = useState({ component: "" });

    useEffect(() => {
        console.log(prop.currentUser);
        let isSubscribed = true;
        getStores()
            .then(res => {
                if (isSubscribed) {
                    console.log('storeData:', res);
                    updateStores(res.data.listStores.items);
                    if (res.data.listStores.items[0]) {
                        updateSelectStore(res.data.listStores.items[0])
                    };
                } else { return null };
            })
            .catch(error => (isSubscribed ? console.log('error fetching stores', error) : null));
        return () => (isSubscribed = false);
    }, []);

    async function getStores() {
        try {
            return await API.graphql({
                query: ListStores,
                variables: { filter: { createdBy: { eq: prop.currentUser.username } } }
            });
        } catch (err) {
            return err;
        }
    }

    return (
        <div className="store-wrapper">
            <div className="side-panel">
                <ul>
                    {
                        stores.map((store, index) => (
                            <li key={index}>
                                <h3>{store.name}</h3>
                            </li>
                        ))
                    }
                    <li>+</li>
                </ul>
                <div>Add Store</div>
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