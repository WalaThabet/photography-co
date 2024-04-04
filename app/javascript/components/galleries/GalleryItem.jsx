import React from 'react';
import PropTypes from 'prop-types';

const GalleryItem = ({ title, description, coverImage }) => {
  return (
    <div className="gallery-item m-4 p-4 border rounded shadow-lg">
      <img src={coverImage} alt={`Cover for ${title}`} className="w-full h-32 object-cover rounded" />
      <h3 className="text-lg font-bold mt-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

GalleryItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
};

export default GalleryItem;
