import React from 'react';
import './modal.css';


function Modal(prop) {
    if (!prop.component) {
        return null;
    };
    
    return (
        <div className={"modal-background"}>
            <div className={"modal-child"} onClick={e => e.stopPropagation()}>
                {prop.component}
            </div>
        </div>
    );
};

export default Modal;