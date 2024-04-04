import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PhotoUploadForm from './PhotoUploadForm';
import GalleryList from '../galleries/GalleryList';
import axios from 'axios';

const PhotographerDashboard = () => {
  const [photographer, setPhotographer] = useState({ galleries: [] });
  const { photographerId } = useParams();

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const response = await axios.get(`/api/v1/photographers/${photographerId}`);
        setPhotographer(response.data || { galleries: [] });
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
    <main className="dashboard-container">
      <h1 className="text-center text-4xl font-bold my-10">Your Dashboard</h1>
      {photographer.galleries.length > 0 ? (
        <>
          <PhotoUploadForm galleryId={photographer.galleries[0].id} />
          <GalleryList galleries={photographer.galleries} />
        </>
      ) : (
        <div className="text-center">
          <p className="text-lg">You don't have any galleries yet.</p>
          {/* Link to create a new gallery. Adjust the path as needed. */}
          <Link to="/new-gallery" className="text-blue-500">Create your first gallery</Link>
        </div>
      )}
    </main>
  );
};

export default PhotographerDashboard;
