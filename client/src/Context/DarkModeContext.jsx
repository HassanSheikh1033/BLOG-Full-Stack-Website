import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define action types
const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
const SET_DARK_MODE = 'SET_DARK_MODE';

// Define reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case TOGGLE_DARK_MODE:
            {
                localStorage.setItem('darkMode', !state.darkMode);
                return { ...state, darkMode: !state.darkMode };
            }
        case SET_DARK_MODE:
            return { ...state, darkMode: action.payload };
        default:
            return state;
    }
};

// Create initial state
const initialState = {
    darkMode: false
};


const DarkModeContext = createContext()

export const DarkModeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);


    return (
        <DarkModeContext.Provider value={{ ...state, dispatch }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
}