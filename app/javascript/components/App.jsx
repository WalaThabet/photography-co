import React, { useState, createContext, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import GalleryList from "./galleries/GalleryList";
import PhotographerCard from "./photographers/PhotographerCard";
import PhotographerDashboard from "./photographers/PhotographerDashboard";
import SignInPage from "./SignInPage";
import axios from "axios";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.isAuthenticated ? children : <Navigate to="/sign_in" />;
};

const Home = () => (
  <>
    <h1 className="text-center text-4xl font-bold my-10">
      PhotographyCo Galleries
    </h1>
    <GalleryList />
    <h2 className="text-center text-2xl font-bold my-6">
      Featured Photographers
    </h2>
    <PhotographerCard
      name="Jane Doe"
      bio="Passionate landscape photographer with a love for the natural world."
      profilePicture="path_to_photographer_image"
    />
    {/* More PhotographerCards would go here */}
  </>
);

const App = () => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

  const signIn = (user) => {
    setAuth({ isAuthenticated: true, user: user });
  };

  const signOut = () => {
    setAuth({ isAuthenticated: false, user: null });
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/api/v1/check_auth", {
          withCredentials: true,
        });
        if (response.data.isAuthenticated) {
          store.dispatch({
            type: "LOGIN",
            payload: { user: response.data.user },
          });
        } else {
          store.dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        store.dispatch({ type: "LOGOUT" });
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthContext.Provider value={{ ...auth, signIn, signOut }}>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/sign_in" element={<SignInPage />} />
              <Route
                path="/photographers/:photographerId/dashboard"
                element={<PhotographerDashboard />}
              />
            </Routes>
          </Router>
        </AuthContext.Provider>
      </PersistGate>
    </Provider>
  );
};

export default App;
