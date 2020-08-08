import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listStores as ListStores } from '../graphql/queries';
import './store-component.css';

function StoreComponent() {
    const [stores, updateStores] = useState([]);
    const [selectedStore, updateSelectStore] = useState({});

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const storeData = await API.graphql({
                query: ListStores,
                variables: {},
                authMode: "AWS_IAM"
            });
            console.log('storeData:', storeData);
            updateStores(storeData.data.listStores.items);
            updateSelectStore(storeData.data.listStores.items[0]);
        } catch (err) {
            console.log('error fetching stores', err)
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
        </div>
    );
};

export default StoreComponent;