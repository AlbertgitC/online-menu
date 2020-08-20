import React, { useState, useEffect } from 'react';
import StoreList from './components/list-stores';
import Header from './components/header';
import Landing from './components/landing';
import Landing2 from './components/landing2';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserPanel from './components/user-panel';
import { Auth } from 'aws-amplify';
import GlobalStore from './components/util/global-store';

function App() {
    const [currentUser, setUser] = useState(null);
    useEffect(() => {
        let isSubscribed = true;
        Auth.currentAuthenticatedUser()
            .then(res => (
                isSubscribed ? setUser(res) : null
            ))
            .catch(err => (
                isSubscribed ? console.log("error finding user:", err) : null
            ));
        return () => (isSubscribed = false);
    }, []);

    function ProtectedRoute({ children, ...rest }) {
        return (
            <Route
                {...rest}
                render={({ location }) => {
                    if (currentUser) {
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

    function PublicRoute({ children, ...rest }) {
        return (
            <Route
                {...rest}
                render={({ location }) => {
                    if (!currentUser) {
                        return children;
                    } else {
                        return (<Redirect
                            to={{
                                pathname: "/user-panel",
                                state: { from: location }
                            }}
                        />);
                    }
                }}
            />
        );
    };

    return (
        <GlobalStore>
            <div className="main">
                <Switch>
                    <ProtectedRoute exact path="/user-panel">
                        <UserPanel setUser={setUser} currentUser={currentUser}/>
                    </ProtectedRoute>
                    <PublicRoute path="/">
                        <Header currentUser={currentUser} setUser={setUser}/>
                        <div className="splash"></div>
                        <div className="content">
                            <Landing setUser={setUser}/>
                            <Landing2 />
                            <StoreList />
                        </div>
                        <div>Footer</div>
                    </PublicRoute>
                </Switch>
            </div>
        </GlobalStore>
    );
}

export default App;
