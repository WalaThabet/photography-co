import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GalleryList from "./galleries/GalleryList";
import GalleryForm from "./galleries/GalleryForm";
import { GalleriesProvider } from '../contexts/GalleriesContext';
import PhotographerCard from "./photographers/PhotographerCard";
import PhotographerDashboard from "./photographers/PhotographerDashboard";
import Navbar from "./Navbar";
import SignInPage from "./SignInPage";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";
import { AuthProvider } from "./AuthContext";
import AuthCheck from "./AuthCheck";
import axios from "axios";
axios.defaults.withCredentials = true;

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
  return (
    <Provider store={store}>
          <GalleriesProvider>

      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <AuthCheck />
          <Router>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/sign_in" element={<SignInPage />} />
              <Route
                path="/photographers/:photographerId/dashboard"
                element={<PhotographerDashboard />}
              />
              <Route
                path="/photographers/:photographerId/new-gallery"
                element={<GalleryForm />}
              />
            </Routes>
          </Router>
        </AuthProvider>
      </PersistGate>
      </GalleriesProvider>

    </Provider>
  );
};

export default App;
