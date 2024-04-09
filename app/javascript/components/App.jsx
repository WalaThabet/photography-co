import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GalleryForm from "./galleries/GalleryForm";
import { GalleriesProvider } from "../contexts/GalleriesContext";
import GalleryShowPage from "./galleries/GalleryShowPage";
import PhotoUploadForm from "./galleries/PhotoUploadForm";
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
                <Route path="/sign_in" element={<SignInPage />} />
                <Route
                  path="/photographers/:photographerId/dashboard"
                  element={<PhotographerDashboard />}
                />
                <Route
                  path="/photographers/:photographerId/new-gallery"
                  element={<GalleryForm />}
                />
                <Route
                  path="/photographers/:photographerId/galleries/:galleryId"
                  element={<GalleryShowPage />}
                />
                <Route
                  path="/photographers/:photographerId/galleries/:galleryId/upload-photo"
                  element={<PhotoUploadForm />}
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
