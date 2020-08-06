import React from 'react';
import StoreList from './components/list-stores';
import StoreForm from './components/store-form';
import Header from './components/header';
import Landing from './components/landing';
import Landing2 from './components/landing2';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import UserPanel from './components/user-panel';

function App() {

    return (
        <div className="main">
            <Switch>
                <Route path="/user-panel">
                    <UserPanel />
                </Route>
                <Route path="/">
                    <Header />
                    <div className="splash"></div>
                    <div className="content">
                        <Landing />
                        <Landing2 />
                        <StoreForm />
                        <StoreList />
                    </div>
                    <div>Footer</div>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
