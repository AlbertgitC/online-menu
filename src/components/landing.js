import React from 'react';
import { SignupForm } from './signup-form';
import './landing.css';

function Landing(prop) {

    return (
        <div className="landing">
            <div className="slogan">
                <p>Should Say Something Here</p>
            </div>
            <SignupForm setUser={prop.setUser}/>
        </div>
    );
};

export default Landing;