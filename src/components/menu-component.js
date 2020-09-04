import React, { useState, useEffect, useContext } from 'react';
import { StoreContext, UserContext } from './util/global-store';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCog } from '@fortawesome/free-solid-svg-icons'
import Modal from './modal/modal';
import LocationForm from './location-form';
import ItemForm from './item-form';
import './menu-component.css';

function MenuComponent() {
    const [storesData, dispatch] = useContext(StoreContext);
    const [selectedStore, setStore] = useState({});
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setLocation] = useState({});
    const [selectedItems, setItems] = useState([]);
    const [category, setCategory] = useState({ name: "", items: [] });
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

        function initSelectedItems(storeId, itemsArr) {
            if (!itemsArr[0]) return;

            const selectedItems = [];

            for (const item of itemsArr) {
                if (item.storeId === storeId) { selectedItems.push(item); };
            };

            selectedItems.sort((a, b) => {
                return a.name - b.name;
            });
            
            setItems(selectedItems);
        };

        if (storesData.stores && storesData.stores[0] && !selectedStore.id) {
            setStore(storesData.stores[0]);
            initSelectedLocations(storesData.stores[0].id, storesData.locations);
            initSelectedItems(storesData.stores[0].id, storesData.items);
        };

        if (locations[0] && !selectedLocation.id) {
            setLocation({ ...locations[0], idx: 0 });
        };

        if (selectedStore.id) {
            const storeList = document.getElementsByClassName("store-list");
            storeList[0].addEventListener('mouseleave', e => {
                storeList[0].style.display = "none";
            });
        };
    }, [storesData, locations, selectedStore, selectedLocation]);

    function selectLocation(idx, event) {
        setLocation({ ...locations[idx], idx: idx });
        const locationLis = document.getElementsByClassName("location-li");
        for (let i = 0; i < locationLis.length; i++) {
            locationLis[i].style.backgroundColor = "#242526";
        };
        event.currentTarget.style.backgroundColor = "#000000";

        // setSelectedLocations(selected.id);
    };

    function changeStore(event, store) {
        event.stopPropagation();
        const storeList = document.getElementsByClassName("store-list");
        storeList[0].style.display = "none";
        setStore(store);

        const selectedLocations = [];

        for (const location of storesData.locations) {
            if (location.storeId === store.id) { selectedLocations.push(location); };
        };

        selectedLocations.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });

        setLocations(selectedLocations);

        const selectedItems = [];

        for (const item of storesData.items) {
            if (item.storeId === store.id) { selectedItems.push(item); };
        };

        selectedItems.sort((a, b) => {
            return a.name - b.name;
        });

        setItems(selectedItems);

        if (selectedLocations.length > 0) {
            setLocation({ ...selectedLocations[0], idx: 0 });
            const locationLis = document.getElementsByClassName("location-li");
            for (let i = 0; i < locationLis.length; i++) {
                locationLis[i].style.backgroundColor = "#242526";
            };
            if (locationLis.length > 0) {
                locationLis[0].style.backgroundColor = "#000000";
            };
        } else {
            setLocation({});
        };
    };

    function showStoreList() {
        const storeList = document.getElementsByClassName("store-list");
        storeList[0].style.display = "block";
    }

    function createLocationForm() {
        updateModal({
            component: <LocationForm
                storeId={selectedStore.id}
                modalAction={updateModal}
                updateSelectLocations={setLocations}
                selectedLocations={locations}
                action="create"
            />
        });
    };

    function updateLocationForm() {
        updateModal({
            component: <LocationForm
                modalAction={updateModal}
                updateSelectLocations={setLocations}
                selectedLocations={locations}
                targetLocationIdx={selectedLocation.idx}
                setLocation={setLocation}
                action="update"
            />
        });
    };

    function createItemForm() {
        updateModal({
            component: <ItemForm
                storeId={selectedStore.id}
                modalAction={updateModal}
                updateSelectItems={setItems}
                selectedItems={selectedItems}
                action="create"
            />
        });
    };

    function showCategoryInput() {
        const categoryInput = document.getElementsByClassName("category-input")[0];
        const style = window.getComputedStyle(categoryInput);
        if (style.getPropertyValue('display') === "none") {
            categoryInput.style.display = "block";
        } else {
            categoryInput.style.display = "none";
        }
    };

    function handleCategoryInput(e) {
        setCategory({ ...category, name: e.target.value });
    };

    async function createCategory() {
        if (!category.name) return;

        let { id, menuCategories } = selectedLocation;
        const categoryString = JSON.stringify(category);

        if (!menuCategories) {
            menuCategories = [categoryString];
        } else {
            menuCategories.push(categoryString);
        };
        console.log(menuCategories);
        try {
            await API.graphql(graphqlOperation(mutations.updateLocation, { input: {
                id: id,
                menuCategories: menuCategories
            } })).then(res => {
                    console.log(res);
                    setCategory({ ...category, name: "" });
                });
        } catch (err) {
            console.log(err);
        };
    };

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
                            <li onClick={createLocationForm}>
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
                                                    <li key={idx} className="menu-store-li" onClick={
                                                        e => {changeStore(e, store)}
                                                        }>
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
                            <div className="edit-button" onClick={updateLocationForm}>Edit Location</div>
                            : <></>
                    }
                </div>
                <div className="user-panel-detail">
                    <button className="add-item" onClick={createItemForm}>Create Item</button>
                    <div>Menu:</div>
                    {
                        selectedLocation.id ?
                            <div className="create-category">
                                <div onClick={showCategoryInput}>Create Menu Category</div>
                                <div className="category-input">
                                    <input name='name'
                                        onChange={handleCategoryInput}
                                        value={category.name}
                                        placeholder='category name'
                                    ></input>
                                    <FontAwesomeIcon icon={faPlus} onClick={createCategory}/>
                                </div>
                            </div>
                            : <></>
                    }
                    <ul className="menu">
                        <li>some categories</li>
                        {
                            selectedItems.map((item, idx) => (
                                <li key={idx}>
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <Modal component={modalState.component} />
        </div>
    );
};

export default MenuComponent;