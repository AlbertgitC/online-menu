import React, { createContext, useReducer } from "react";
import Reducer from './reducer'


export const storeInitialState = {
    stores: [],
    locations: []
};

export const userInitialState = {
    user: null
};

export const StoreContext = createContext();

export const UserContext = createContext();

export const GlobalStore = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, storeInitialState);
    return (
        <StoreContext.Provider value={[state, dispatch]}>
            {children}
        </StoreContext.Provider>
    )
};

export const AuthState = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, userInitialState);
    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    )
};