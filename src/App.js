import React from 'react';
import StoreList from './components/list-stores';
import StoreForm from './components/store-form';
import Header from './components/header';
import { SignupForm } from './components/signup-form';
import './app.css';

function App() {

    return (
        <div className="main">
            <Header />
            <div className="body">
                <div className="landing">
                    <SignupForm />
                </div>
                <StoreForm />
                <StoreList />
            </div>
            <div>Footer</div>
        </div>
    );
}

export default App;
