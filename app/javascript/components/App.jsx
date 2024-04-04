import React from 'react';
import GalleryList from './galleries/GalleryList';
import PhotographerCard from './photographers/PhotographerCard';

const App = () => {
  return (
    <main className="app-container">
      <h1 className="text-center text-4xl font-bold my-10">PhotographyCo Galleries</h1>
      <GalleryList />
      <h2 className="text-center text-2xl font-bold my-6">Featured Photographers</h2>
      {/* Example usage of the PhotographerCard with static data */}
      <PhotographerCard
        name="Jane Doe"
        bio="Passionate landscape photographer with a love for the natural world."
        profilePicture="path_to_photographer_image" // Replace with actual image path or URL
      />
      {/* More PhotographerCards would go here */}
    </main>
  );
};

export default App;
