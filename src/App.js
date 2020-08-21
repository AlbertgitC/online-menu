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
import Main from './components/main';

function App() {
    // const [currentUser, setUser] = useState(null);
    // useEffect(() => {
    //     let isSubscribed = true;
    //     Auth.currentAuthenticatedUser()
    //         .then(res => (
    //             isSubscribed ? setUser(res) : null
    //         ))
    //         .catch(err => (
    //             isSubscribed ? console.log("error finding user:", err) : null
    //         ));
    //     return () => (isSubscribed = false);
    // }, []);

    // function ProtectedRoute({ children, ...rest }) {
    //     return (
    //         <Route
    //             {...rest}
    //             render={({ location }) => {
    //                 if (currentUser) {
    //                     return children;
    //                 } else {
    //                     return (<Redirect
    //                         to={{
    //                             pathname: "/",
    //                             state: { from: location }
    //                         }}
    //                     />);
    //                 }
    //             }}
    //         />
    //     );
    // };

    // function PublicRoute({ children, ...rest }) {
    //     return (
    //         <Route
    //             {...rest}
    //             render={({ location }) => {
    //                 if (!currentUser) {
    //                     return children;
    //                 } else {
    //                     return (<Redirect
    //                         to={{
    //                             pathname: "/user-panel",
    //                             state: { from: location }
    //                         }}
    //                     />);
    //                 }
    //             }}
    //         />
    //     );
    // };

    return (
        <GlobalStore>
            <Main/>
        </GlobalStore>
    );
}

export default App;
