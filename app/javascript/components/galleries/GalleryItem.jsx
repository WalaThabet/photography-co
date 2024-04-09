import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { useGalleries } from "../../contexts/GalleriesContext";

const GalleryItem = ({
  id,
  title,
  description,
  coverImage,
  photographerId,
}) => {
  const { removeGallery } = useGalleries();
  const imageUrl = coverImage ? coverImage : "path_to_default_image.jpg";

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `/api/v1/photographers/${photographerId}/galleries/${id}`
      );
      if (response.status === 204) {
        removeGallery(id);
      }
    } catch (error) {
      console.error("Failed to delete gallery:", error);
    }
  };

  return (
    <div className="gallery-item m-4 p-4 border rounded shadow-lg relative">
      <Link to={`/photographers/${photographerId}/galleries/${id}`}>
        {coverImage && (
          <img
            src={imageUrl}
            alt={`Cover for ${title}`}
            className="w-full h-32 object-cover rounded"
          />
        )}
        <h3 className="text-lg font-bold mt-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </Link>
      <div className="absolute top-2 right-2 flex space-x-2">
        <Link
          to={`/galleries/edit/${id}`}
          className="text-blue-500 hover:text-blue-700"
        >
          <AiOutlineEdit size={24} />
        </Link>
        <button
          onClick={() => handleDelete(id)}
          className="text-red-500 hover:text-red-700"
        >
          <AiOutlineDelete size={24} />
        </button>
      </div>
    </div>
  );
};

GalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  coverImage: PropTypes.string,
};

export default GalleryItem;
