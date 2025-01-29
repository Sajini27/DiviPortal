import React, { createContext, useState, useEffect } from 'react';

// Create a Context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Check if user is logged in based on token and username stored in localStorage
        const storedToken = localStorage.getItem('authToken');
        const storedUserName = localStorage.getItem('userName');

        if (storedToken) {
            setToken(true);
            if (storedUserName) {
                setUserName(storedUserName);
            }
        }
    }, []);

    const login = (username) => {
        localStorage.setItem('authToken', 'true');
        localStorage.setItem('userName', username);
        setToken(true);
        setUserName(username);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        setToken(false);
        setUserName('');
    };

    return (
        <AppContext.Provider value={{ token, userName, login, logout }}>
            {children}
        </AppContext.Provider>
    );
};