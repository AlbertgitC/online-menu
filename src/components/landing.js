import React, { useEffect, useState } from 'react';
import { SignupForm } from './signup-form';
import './landing.css';

function Landing() {

    return (
        <div className="landing">
            <div className="slogan">
                <p>Should Say Something Here</p>
            </div>
            <SignupForm />
        </div>
    );
};

export default Landing;