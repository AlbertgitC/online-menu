import React from 'react';
import StoreList from './components/list-stores';
import StoreForm from './components/store-form';
import Header from './components/header';
import Landing from './components/landing';
import './App.css';

function App() {

    return (
        <div className="main">
            <Header />
            <div className="body">
                <Landing />
                <StoreForm />
                <StoreList />
            </div>
            <div>Footer</div>
        </div>
    );
}

export default App;
