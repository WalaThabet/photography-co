import { useEffect } from "react";
import { useAuth } from "../components/AuthContext";

const AuthCheck = () => {
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return null;
};

export default AuthCheck;
