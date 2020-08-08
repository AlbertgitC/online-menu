import React, { useState, useEffect } from 'react';
import './user-panel.css';
import StoreComponent from './store-component';

const initialState = { component: <StoreComponent /> };

function menuClick() {
    const menu = document.getElementsByClassName("dropdown_menu");
    menu[0].style.display = "block";
};

function UserPanel() {
    const [currentComponent, updateComponent] = useState(initialState);

    useEffect(() => {
        const menuDropdown = document.getElementsByClassName("dropdown_menu");
        menuDropdown[0].addEventListener('mouseleave', e => {
            menuDropdown[0].style.display = "none";
        });
    }, []);

    

    return (
        <div className="user-panel-wrapper">
            <div>
                <div class="dropdown" onClick={menuClick}>MENU
                    <ul class="dropdown_menu">
                        <li class="dropdown_item-1">Item 1</li>
                        <li class="dropdown_item-2">Item 2</li>
                        <li class="dropdown_item-3">Item 3</li>
                        <li class="dropdown_item-4">Item 4</li>
                        <li class="dropdown_item-5">Item 5</li>
                    </ul>
                </div>
                <h3>Online Menu</h3>
            </div>
            {currentComponent.component}
        </div>
    );
};

export default UserPanel;