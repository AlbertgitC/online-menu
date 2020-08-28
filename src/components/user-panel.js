import React, { useState, useEffect, useContext } from 'react';
import './user-panel.css';
import StoreComponent from './store-component';
import MenuComponent from './menu-component';
import { signOut } from './util/util-auth';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { StoreContext, UserContext } from './util/global-store';

function UserPanel() {
    const [storeData, dispatch] = useContext(StoreContext);
    const [authState, authDispatch] = useContext(UserContext);
    const [currentComponent, updateComponent] = useState(<StoreComponent />);
    const history = useHistory();

    useEffect(() => {
        const menuDropdown = document.getElementsByClassName("dropdown_menu");
        menuDropdown[0].addEventListener('mouseleave', e => {
            menuDropdown[0].style.display = "none";
        });
    }, []);

    function menuClick() {
        const menu = document.getElementsByClassName("dropdown_menu");
        menu[0].style.display = "block";
    };

    function itemClick(component) {
        const menu = document.getElementsByClassName("dropdown_menu");
        menu[0].style.display = "none";
        switch(component) {
            case "stores":
                updateComponent(<StoreComponent />);
                return;
            case "menu":
                updateComponent(<MenuComponent />);
                return;
            default:
                updateComponent(<StoreComponent />);
                return;
        };
    };

    function signOutRedirect() {
        signOut().then(
            () => {
                dispatch({
                    type: 'CLEAR_STORE'
                });
                authDispatch({
                    type: 'SIGN_OUT'
                });
                history.push("/");
            }
        );
    };

    return (
        <div className="user-panel-wrapper">
            <div>
                <FontAwesomeIcon icon={faBars} className="dropdown" onClick={menuClick}/>
                <ul className="dropdown_menu">
                    <li className="dropdown_item-1">Orders</li>
                    <li className="dropdown_item-2" onClick={() => {itemClick("stores")}}>Stores</li>
                    <li className="dropdown_item-3" onClick={() => {itemClick("menu")}}>Menu</li>
                    <li className="dropdown_item-4">User Info</li>
                    <li className="dropdown_item-5" onClick={signOutRedirect}>Sign out</li>
                </ul>
                <h3>Online Menu</h3>
            </div>
            {currentComponent}
        </div>
    );
};

export default UserPanel;