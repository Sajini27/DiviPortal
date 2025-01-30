import React, { createContext, useState, useEffect } from 'react';

// Create a Context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState(''); // Store user role

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUserName = localStorage.getItem('userName');
        const storedRole = localStorage.getItem('role'); 

        if (storedToken) {
            setToken(storedToken);
            if (storedUserName) {
                setUserName(storedUserName);
            }
            if (storedRole) {
                setRole(storedRole); // Set the role from localStorage
            }
        }
    }, []);

    const login = (token, username, userRole) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userName', username);
        localStorage.setItem('role', userRole); 
        setToken(token);
        setUserName(username);
        setRole(userRole); // Set role
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('role');
        setToken(null);
        setUserName('');
        setRole(''); // Reset role
    };

    return (
        <AppContext.Provider value={{ token, userName, role, login, logout }}>
            {children}
        </AppContext.Provider>
    );
};
