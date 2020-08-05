import React from 'react';
import StoreList from './components/list-stores';
import StoreForm from './components/store-form';
import Header from './components/header';
import Landing from './components/landing';
import Landing2 from './components/landing2';
import './App.css';

function App() {

    return (
        <div className="main">
            <Header />
            <div className="splash">
                <div className="content">
                    <Landing />
                    <Landing2 />
                    <StoreForm />
                    <StoreList />
                </div>
                <div>Footer</div>
            </div>
        </div>
    );
}

export default App;
