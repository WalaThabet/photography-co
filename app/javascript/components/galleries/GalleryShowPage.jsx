import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PhotographerSidebar from "../photographers/PhotographerSidebar";
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
    <div className="flex h-screen">
      {" "}
      <PhotographerSidebar photographerId={photographerId} gallery={gallery} />
      <main className="flex-grow flex justify-center items-center">
        {(gallery.photos && gallery.photos.length > 0) ? (
          <Carousel showArrows={true} showThumbs={false} dynamicHeight={true}>
            {gallery.photos.map((photo, index) => (
              <div key={index}>
                <img src={photo.image_url} alt={`Photo for ${gallery.title}`} />
                <p className="legend">{photo.title}</p>
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 text-center">
            <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
              <img src={gallery.cover_image_url} alt="card-image" />
            </div>
            <div className="p-6">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {gallery.title}
              </h5>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                {gallery.description}
              </p>
            </div>
            <div className="p-6 pt-0">
              <Link
                to={`/photographers/${photographerId}/galleries/${galleryId}/upload-photo`}
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              >
                Upload your first gallery photos
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GalleryShowPage;
