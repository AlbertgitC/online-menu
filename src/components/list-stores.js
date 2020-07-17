import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listStores as ListStores } from '../graphql/queries';

function StoreList() {
    const [stores, updateStores] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const storeData = await API.graphql({
                query: ListStores,
                variables: {},
                authMode: 'API_KEY'
            });
            console.log('storeData:', storeData);
            updateStores(storeData.data.listStores.items);
        } catch (err) {
            console.log('error fetching stores', err)
        }
    }
    
    return (
        <div>
            {
                stores.map((store, index) => (
                    <div key={index}>
                        <h2>{store.name}</h2>
                        <p>{store.description}</p>
                        <p>{store.phoneNumber}</p>
                        <p>{store.streetAddress}</p>
                        <p>{store.usState} {store.zipCode}</p>
                        <ul>
                            {store.subMenu.map((category, i) => (
                                <li key={i}>{category}</li>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </div>
    );
};

export default StoreList;