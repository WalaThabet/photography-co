import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GalleryList from './galleries/GalleryList';
import PhotographerCard from './photographers/PhotographerCard';
import PhotographerDashboard from './photographers/PhotographerDashboard';

const Home = () => (
  <>
    <h1 className="text-center text-4xl font-bold my-10">PhotographyCo Galleries</h1>
    <GalleryList />
    <h2 className="text-center text-2xl font-bold my-6">Featured Photographers</h2>
    <PhotographerCard
      name="Jane Doe"
      bio="Passionate landscape photographer with a love for the natural world."
      profilePicture="path_to_photographer_image"
    />
    {/* More PhotographerCards would go here */}
  </>
);

const App = () => {
  return (
    <Router>
      <main className="app-container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/photographers/:photographerId/dashboard" element={<PhotographerDashboard />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
