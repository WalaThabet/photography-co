import React from "react";
import { Link } from "react-router-dom";
import { HiCamera, HiViewGrid } from "react-icons/hi";

const PhotographerSidebar = ({ photographerId }) => {
  return (
    <div className="sticky top-0 flex rounded-xl bg-white text-gray-700 h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        <Link
          to={`/photographers/${photographerId}/dashboard`}
          className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
        >
          <div className="grid place-items-center mr-4">
            <HiViewGrid className="h-5 w-5" />
          </div>
          Dashboard
        </Link>
        <Link
          to={`/photographers/${photographerId}/new-gallery`}
          className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
        >
          <div className="grid place-items-center mr-4">
            <HiCamera className="h-5 w-5" />
          </div>
          Create Gallery
        </Link>
      </nav>
    </div>
  );
};

export default PhotographerSidebar;
