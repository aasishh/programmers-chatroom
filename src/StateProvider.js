import React, { createContext, useContext, useReducer } from "react";

// createContext helpsto create data layer to wrap our <App /> (or, any component) to push/pull information from it. 
export const StateContext = createContext();

// Much like Provider in redux.
export const StateProvider = ({ reducer, initialState, children}) => (
    <StateContext.Provider value = { useReducer(reducer, initialState) }>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);