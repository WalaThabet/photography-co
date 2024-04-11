import React, { createContext, useContext, useState, useCallback } from "react";

export const AuthContext = createContext({
  auth: { isAuthenticated: false, user: null },
  signIn: () => {},
  signOut: () => {},
  checkAuthStatus: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

  const signIn = useCallback((user) => {
    setAuth({ isAuthenticated: true, user });
    localStorage.setItem("isAuthenticated", "true");
  }, []);

  const signOut = useCallback(() => {
    setAuth({ isAuthenticated: false, user: null });
    localStorage.setItem("isAuthenticated", "false");
  }, []);

  const checkAuthStatus = useCallback(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      setAuth({ isAuthenticated: true, user: {} });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, signIn, signOut, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
