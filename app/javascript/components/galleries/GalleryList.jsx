import React from "react";
import GalleryItem from "./GalleryItem";
import { useParams } from "react-router-dom";

const GalleryList = ({ galleries }) => {
  const { photographerId } = useParams();
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleries.map((gallery) => (
          <GalleryItem
            key={gallery.id}
            id={gallery.id}
            title={gallery.title}
            description={gallery.description}
            coverImage={gallery.cover_image_url}
            photographerId={photographerId}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryList;
