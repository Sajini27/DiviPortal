import React, { createContext, useState, useEffect } from 'react';

// Create a Context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(''); // New state for userId
  const [role, setRole] = useState(''); // Store user role

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUserName = localStorage.getItem('userName');
    const storedUserId = localStorage.getItem('userId'); // Retrieve user id
    const storedRole = localStorage.getItem('role'); 

    if (storedToken) {
      setToken(storedToken);
      if (storedUserName) {
        setUserName(storedUserName);
      }
      if (storedUserId) {
        setUserId(storedUserId);
      }
      if (storedRole) {
        setRole(storedRole);
      }
    }
  }, []);

  const login = (token, username, userId, userRole) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', username);
    localStorage.setItem('userId', userId); // Save user id
    localStorage.setItem('role', userRole); 
    setToken(token);
    setUserName(username);
    setUserId(userId);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    setToken(null);
    setUserName('');
    setUserId('');
    setRole('');
  };

  return (
    <AppContext.Provider value={{ token, userName, userId, role, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};
