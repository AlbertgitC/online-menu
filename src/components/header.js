import React, { useReducer, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const userInfo = Auth.currentAuthenticatedUser();

function Header() {
    useEffect(() => {
        console.log(userInfo);
    }, [userInfo]);

    return (
        <div>
            <div>Online Menu</div>
        </div>
    );
};

export default Header;