import React from 'react';
import StoreList from './components/list-stores';
import StoreForm from './components/store-form';
import Header from './components/header';
import Landing from './components/landing';
import Landing2 from './components/landing2';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserPanel from './components/user-panel';
import { isAuthenticated } from './components/util/util-auth';

function ProtectedRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                console.log(isAuthenticated());
                if (isAuthenticated()) {
                    console.log(isAuthenticated());
                    console.log("render proctected route");
                    return children;
                 } else {
                    return (<Redirect
                            to={{
                                pathname: "/",
                                state: { from: location }
                            }}
                        />);
                }
            }}
        />
    );
};

function App() {

    return (
        <div className="main">
            <Switch>
                <ProtectedRoute path="/user-panel">
                    <UserPanel />
                </ProtectedRoute>
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
