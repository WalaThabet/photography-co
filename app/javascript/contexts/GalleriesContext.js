import React, { createContext, useContext, useState } from "react";

const GalleriesContext = createContext();

export const useGalleries = () => useContext(GalleriesContext);

export const GalleriesProvider = ({ children }) => {
  const [galleries, setGalleries] = useState([]);

  const removeGallery = (galleryId) => {
    setGalleries(galleries.filter((gallery) => gallery.id !== galleryId));
  };

  return (
    <GalleriesContext.Provider
      value={{ galleries, setGalleries, removeGallery }}
    >
      {children}
    </GalleriesContext.Provider>
  );
};
