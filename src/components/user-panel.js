import React, { useState, useEffect, useContext } from 'react';
import './user-panel.css';
import StoreComponent from './store-component';
import { signOut } from './util/util-auth';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Context } from './util/global-store';

function menuClick() {
    const menu = document.getElementsByClassName("dropdown_menu");
    menu[0].style.display = "block";
};

function UserPanel(prop) {
    const [globalState, dispatch] = useContext(Context);
    const initialState = { component: <StoreComponent /> };
    const [currentComponent, updateComponent] = useState(initialState);
    const history = useHistory();

    useEffect(() => {
        const menuDropdown = document.getElementsByClassName("dropdown_menu");
        menuDropdown[0].addEventListener('mouseleave', e => {
            menuDropdown[0].style.display = "none";
        });
    }, []);

    function signOutRedirect() {
        signOut().then(
            res => {
                dispatch({
                    type: 'SIGN_OUT'
                });
                prop.setUser(res);
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
                    <li className="dropdown_item-2">Stores</li>
                    <li className="dropdown_item-3">Menu</li>
                    <li className="dropdown_item-4">User Info</li>
                    <li className="dropdown_item-5" onClick={signOutRedirect}>Sign out</li>
                </ul>
                <h3>Online Menu</h3>
            </div>
            {currentComponent.component}
        </div>
    );
};

export default UserPanel;