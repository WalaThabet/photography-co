import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import GalleryList from "../galleries/GalleryList";
import PhotographerSidebar from "../PhotographerSidebar";
import { useGalleries } from "../../contexts/GalleriesContext";
import axios from "axios";

const PhotographerDashboard = () => {
  const { galleries, setGalleries } = useGalleries();
  const [photographer, setPhotographer] = useState({ galleries: [] });
  const { photographerId } = useParams();

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const response = await axios.get(
          `/api/v1/photographers/${photographerId}`
        );
        setPhotographer(response.data || []);
        setGalleries(response.data.galleries || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPhotographer();
  }, [photographerId]);

  if (!photographer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <PhotographerSidebar photographerId={photographerId} />

      <main className="flex-grow">
        <h1 className="text-center text-4xl font-bold my-10">Your Dashboard</h1>
        {galleries.length > 0 ? (
          <>
            <GalleryList galleries={galleries} />
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg">You don't have any galleries yet.</p>
            <Link
              to={`/photographers/${photographerId}/new-gallery`}
              className="text-blue-500"
            >
              Create your first gallery
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default PhotographerDashboard;
