import React, { useEffect, useContext } from 'react';
import { Context } from './util/global-store';
import { Auth } from 'aws-amplify';
import StoreList from './list-stores';
import Header from './header';
import Landing from './landing';
import Landing2 from './landing2';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserPanel from './user-panel';

function Main() {
    const [globalState, dispatch] = useContext(Context);

    useEffect(() => {
        let isSubscribed = true;
        Auth.currentAuthenticatedUser()
            .then(res => (
                isSubscribed ? dispatch({
                    type: 'SIGN_IN',
                    payload: res
                }) : null
            ))
            .catch(err => (
                isSubscribed ? console.log("error finding user:", err) : null
            ));
        return () => (isSubscribed = false);
    }, [dispatch]);

    function ProtectedRoute({ children, ...rest }) {
        return (
            <Route
                {...rest}
                render={({ location }) => {
                    if (globalState.user) {
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
                    if (!globalState.user) {
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
        <div className="main">
            <Switch>
                <ProtectedRoute exact path="/user-panel">
                    <UserPanel />
                </ProtectedRoute>
                <PublicRoute path="/">
                    <Header />
                    <div className="splash"></div>
                    <div className="content">
                        <Landing />
                        <Landing2 />
                        <StoreList />
                    </div>
                    <div>Footer</div>
                </PublicRoute>
            </Switch>
        </div>
    );
};

export default Main;