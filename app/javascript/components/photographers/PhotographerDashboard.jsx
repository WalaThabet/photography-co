import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PhotoUploadForm from './PhotoUploadForm';
import GalleryList from '../galleries/GalleryList';
import axios from 'axios'; // Assuming you are using axios for API calls

const PhotographerDashboard = () => {
  const [photographer, setPhotographer] = useState({ galleries: [] }); // Initialize with empty galleries
  const { photographerId } = useParams(); // This will pull the photographer ID from the URL

  useEffect(() => {
    // Fetch the photographer data when the component mounts
    const fetchPhotographer = async () => {
      try {
        const response = await axios.get(`/api/v1/photographers/${photographerId}`);
        setPhotographer(response.data || { galleries: [] }); // Default to empty galleries if no data
      } catch (error) {
        // Handle error (e.g., redirecting to a login page or displaying an error message)
        console.error(error);
      }
    };

    fetchPhotographer();
  }, [photographerId]); // The effect runs when photographerId changes

  // Show loading state while photographer data is being fetched
  if (!photographer) {
    return <div>Loading...</div>;
  }

  // Show the photo upload form and galleries list if galleries are present
  // Otherwise, show a message and a link to create a new gallery
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
      {/* Add more management tools and information here */}
    </main>
  );
};

export default PhotographerDashboard;
