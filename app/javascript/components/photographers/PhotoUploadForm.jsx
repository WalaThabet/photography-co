import React, { useState } from 'react';
import axios from 'axios';

const PhotoUploadForm = ({ galleryId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('photo[title]', title);
    formData.append('photo[description]', description);
    formData.append('photo[image]', image);
    formData.append('photo[gallery_id]', galleryId);

    try {
      const response = await axios.post('/api/v1/galleries/${galleryId}/photos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Upload Photo</button>
    </form>
  );
};

export default PhotoUploadForm;
