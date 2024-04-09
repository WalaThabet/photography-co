import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

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
  }, []);

  const signOut = useCallback(() => {
    setAuth({ isAuthenticated: false, user: null });
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await axios.get("/api/v1/check_auth", {
        withCredentials: true,
      });
      if (response.data.isAuthenticated) {
        signIn(response.data.user);
      } else {
        signOut();
      }
    } catch (error) {
      signOut();
      console.error("Error checking auth status:", error);
    }
  }, [signIn, signOut]);

  return (
    <AuthContext.Provider value={{ auth, signIn, signOut, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
