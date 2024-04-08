import React, { useState } from 'react';
import axios from 'axios';

const GalleryForm = ({ photographerId, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a POST request to create a new gallery
      const response = await axios.post(`/api/v1/photographers/${photographerId}/galleries`, {
        gallery: {
          title: title,
          description: description,
        },
      });
      // If successful, call the onCreate callback with the new gallery
      onCreate(response.data);
    } catch (error) {
      console.error('Failed to create gallery:', error);
      // Handle errors here, such as showing a notification to the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium leading-5 text-gray-700">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium leading-5 text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
      </div>
      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
        Create Gallery
      </button>
    </form>
  );
};

export default GalleryForm;
