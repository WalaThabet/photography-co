import React from 'react';
import GalleryItem from './GalleryItem';

// Sample static data
const galleries = [
  {
    id: 1,
    title: 'Sunset Shots',
    description: 'A collection of all my sunset photos from around the world.',
    coverImage: 'path_to_sunset_image', // Replace with actual image path or URL
  },
  {
    id: 2,
    title: 'Wildlife Wonders',
    description: 'Close-up encounters with the animal kingdom.',
    coverImage: 'path_to_wildlife_image', // Replace with actual image path or URL
  },
  // ...more galleries
];

const GalleryList = () => {
 return (
   <div className="container mx-auto px-4">
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
       {galleries.map((gallery) => (
         <GalleryItem
           key={gallery.id}
           title={gallery.title}
           description={gallery.description}
           coverImage={gallery.coverImage}
         />
       ))}
     </div>
   </div>
 );
};

export default GalleryList;
