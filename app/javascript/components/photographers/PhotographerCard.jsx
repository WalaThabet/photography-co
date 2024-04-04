import React from 'react';
import PropTypes from 'prop-types';

const PhotographerCard = ({ name, bio, profilePicture }) => {
  return (
    <div className="photographer-card m-4 p-4 border rounded shadow-lg">
      <img src={profilePicture} alt={`Profile of ${name}`} className="w-32 h-32 object-cover rounded-full" />
      <h3 className="text-lg font-bold mt-2">{name}</h3>
      <p className="text-sm text-gray-600">{bio}</p>
    </div>
  );
};

PhotographerCard.propTypes = {
  name: PropTypes.string.isRequired,
  bio: PropTypes.string,
  profilePicture: PropTypes.string.isRequired,
};

export default PhotographerCard;
