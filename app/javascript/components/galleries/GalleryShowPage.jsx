import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PhotographerSidebar from "../PhotographerSidebar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
      <PhotographerSidebar photographerId={photographerId} gallery={gallery} />
      <main className="flex-grow">
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
