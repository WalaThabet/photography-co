import React, { useState, createContext, useContext } from "react";
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
 const [auth, setAuth] = useState({
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: JSON.parse(localStorage.getItem('user')) || null
});
const signIn = (newAuthState) => {
 localStorage.setItem('isAuthenticated', 'true');
 localStorage.setItem('user', JSON.stringify(newAuthState.user));
 setAuth(newAuthState);
};

const signOut = () => {
 localStorage.removeItem('isAuthenticated');
 localStorage.removeItem('user');
 setAuth({ isAuthenticated: false, user: null });
};

  return (
   <AuthContext.Provider value={{ ...auth, signIn, signOut }}>
   <Router>
        <main className="app-container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/sign_in" element={<SignInPage />} />
            <Route
              path="/photographers/:photographerId/dashboard"
              element={
                <PrivateRoute>
                  <PhotographerDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
