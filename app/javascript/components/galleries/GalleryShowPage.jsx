import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PhotographerSidebar from "../PhotographerSidebar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { HiPlus } from "react-icons/hi";

const GalleryShowPage = () => {
  const [gallery, setGallery] = useState(null);
  const { photographerId, galleryId } = useParams();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(
          `/api/v1/photographers/${photographerId}/galleries/${galleryId}`
        );
        setGallery(response.data);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      }
    };

    fetchGallery();
  }, [photographerId, galleryId]);

  if (!gallery) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <PhotographerSidebar photographerId={photographerId} />
      <main className="flex-grow">
        <h1 className="text-center text-4xl font-bold my-10">
          {gallery.title} Gallery
        </h1>
        <div className="mb-4 text-center">
          <Link
            to={`/photographers/${photographerId}/galleries/${galleryId}/upload-photo`}
            className="text-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 inline-flex items-center justify-center"
          >
            <HiPlus className="h-5 w-5 mr-2" />
            Add Photo
          </Link>
        </div>
        {gallery.photos?.length > 0 ? (
          <Carousel showArrows={true} showThumbs={false} dynamicHeight={true}>
            {gallery.photos.map((photo, index) => (
              <div key={index}>
                <img src={photo.image_url} alt={`Photo for ${gallery.title}`} />
                <p className="legend">{photo.title}</p>
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="text-center">
            <p className="text-lg">You don't have any photos yet.</p>
            <Link
              to={`/photographers/${photographerId}/galleries/${galleryId}/upload-photo`}
              className="text-blue-500"
            >
              Upload your first gallery photos
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default GalleryShowPage;
