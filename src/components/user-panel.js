import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listStores as ListStores } from '../graphql/queries';
import './user-panel.css';

function UserPanel() {
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
        <div className="user-panel-wrapper">
            <div className="side-panel">
                <div>
                    <div>MENU</div>
                    <h3>Online Menu</h3>
                </div>
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
                    <div>
                        <h2>{selectedStore.name}</h2>
                        <p>{selectedStore.description}</p>
                        <p>{selectedStore.phoneNumber}</p>
                        <p>{selectedStore.email}</p>
                    </div>
                    <div>Edit</div>
                </div>
                <div>Locations</div>
            </div>
        </div>
    );
};

export default UserPanel;