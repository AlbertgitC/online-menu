import React, { createContext, useReducer } from "react";
import Reducer from './reducer'


export const initialState = {
    user: null,
    stores: [],
    error: null
};

const GlobalStore = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default GlobalStore;