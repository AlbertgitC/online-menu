import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listStores as ListStores } from '../graphql/queries';

function StoreList() {
    const [stores, updateStores] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        getData()
            .then(stores => (isSubscribed ? updateStores(stores.data.listStores.items) : null))
            .catch(error => (isSubscribed ? console.log('error fetching stores', error) : null));

        return () => (isSubscribed = false);
    }, []);

    async function getData() {
        try {
            return await API.graphql({
                query: ListStores,
                variables: {},
                authMode: "AWS_IAM"
            });
        } catch (err) {
            return err;
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
                        <p>{store.email}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default StoreList;