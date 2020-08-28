import React, { useEffect, useContext } from 'react';
import { UserContext } from './util/global-store';
import { GlobalStore } from './util/global-store';
import { Auth } from 'aws-amplify';
import StoreList from './list-stores';
import Header from './header';
import Landing from './landing';
import Landing2 from './landing2';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserPanel from './user-panel';

function Main() {
    const [userState, dispatch] = useContext(UserContext);

    useEffect(() => {
        let isSubscribed = true;

        if (isSubscribed) {
            Auth.currentAuthenticatedUser()
                .then(res => {
                    dispatch({
                        type: 'SIGN_IN',
                        payload: res
                    });
                })
                .catch(err => (
                    console.log("error finding user:", err)
                ));
        };

        return () => (isSubscribed = false);
    }, [dispatch]);

    function ProtectedRoute({ children, ...rest }) {
        return (
            <Route
                {...rest}
                render={({ location }) => {
                    if (userState.user) {
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
                    if (!userState.user) {
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
                    <GlobalStore>
                        <UserPanel />
                    </GlobalStore>
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