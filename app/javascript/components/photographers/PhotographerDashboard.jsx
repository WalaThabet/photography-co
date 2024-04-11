import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import GalleryList from "../galleries/GalleryList";
import PhotographerSidebar from "./PhotographerSidebar";
import { useGalleries } from "../../contexts/GalleriesContext";
import axios from "axios";
import { HiPhotograph } from "react-icons/hi";

const PhotographerDashboard = () => {
  const { galleries, setGalleries } = useGalleries();
  const [photographer, setPhotographer] = useState({ galleries: [] });
  const { photographerId } = useParams();

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const response = await axios.get(
          `/api/v1/photographers/${photographerId}`
        );
        setPhotographer(response.data || []);
        setGalleries(response.data.galleries || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPhotographer();
  }, [photographerId]);

  if (!photographer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <PhotographerSidebar photographerId={photographerId} />

      <main className="flex-grow">
        <h1 className="text-center text-4xl font-bold my-10">Your Dashboard</h1>
        {galleries.length > 0 ? (
          <React.Fragment>
            <GalleryList galleries={galleries} />
          </React.Fragment>
        ) : (
          <div className="relative flex flex-col  mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 mx-auto">
            <HiPhotograph className="w-12 h-12 ml-4 mt-4 mb-4 text-gray-900 pl-0" />
            <div className="items-center">
              <div className="p-6">
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  Ready to showcase your talent? Your first gallery is just a
                  few clicks away. Create a stunning gallery to share your
                  unique perspective and captivate your audience. Let the world
                  see through your lens!
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to={`/photographers/${photographerId}/new-gallery`}
                  className="inline-block"
                >
                  <button className="flex items-center gap-2 px-4 py-4 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20">
                    Create your first gallery
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PhotographerDashboard;
