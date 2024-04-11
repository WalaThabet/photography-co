import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import PhotographerSidebar from "../photographers/PhotographerSidebar";

const GalleryForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const { photographerId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("gallery[title]", title);
    formData.append("gallery[description]", description);
    if (coverImage) {
      formData.append("gallery[cover_image]", coverImage);
    }

    try {
      const response = await axios.post(
        `/api/v1/photographers/${photographerId}/galleries`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (onCreate) onCreate(response.data);
      navigate(`/photographers/${photographerId}/dashboard`);
    } catch (error) {
      console.error("Failed to create gallery:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="flex">
        <PhotographerSidebar photographerId={photographerId} />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create Gallery
            </h2>
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gallery Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter gallery title"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter gallery description"
                    rows="4"
                  ></textarea>
                </div>
                <br></br>
                <div>
                  <label
                    htmlFor="coverImage"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cover Image
                  </label>
                  <div className="mt-2">
                    <input
                      type="file"
                      id="coverImage"
                      onChange={(e) => setCoverImage(e.target.files[0])}
                      className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Gallery
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GalleryForm;
