import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiCamera, HiPlus, HiCollection, HiPhotograph } from "react-icons/hi";
import {
  Card,
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const PhotographerSidebar = ({ photographerId, gallery }) => {
  const { galleryId } = useParams();
  const [dashboardOpen, setDashboardOpen] = useState(false);

  useEffect(() => {
    // Open the dashboard accordion if we have a gallery ID
    if (galleryId) {
      setDashboardOpen(true);
    }
  }, [galleryId]); // Dependency array, effect runs when galleryId changes

  const toggleDashboardAccordion = () => {
    setDashboardOpen(!dashboardOpen);
  };

  return (
    <Card className="sticky top-0 h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-xl">
      <nav className="flex-grow flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        <List>
          {/* Dashboard Main Menu Item */}
          <ListItem className="p-0">
            <Link
              to={`/photographers/${photographerId}/dashboard`}
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight"
            >
              <HiCollection className="h-5 w-5" />
              <Typography color="blue-gray" className="ml-4">
                Dashboard
              </Typography>
            </Link>
          </ListItem>

          {/* Galleries Accordion with Submenus */}
          <Accordion open={dashboardOpen}>
            <AccordionHeader
              onClick={toggleDashboardAccordion}
              className="border-b-0 p-3"
            >
              <HiPhotograph className="h-5 w-5" />
              <Typography color="blue-gray" className="ml-4 mr-auto">
                Galleries
              </Typography>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-4 w-4 transition-transform ${
                  dashboardOpen ? "rotate-180" : ""
                }`}
              />
            </AccordionHeader>
            <AccordionBody
              className={`py-1 ${dashboardOpen ? "block" : "hidden"}`}
            >
              <List className="p-0">
                {/* Create Gallery Submenu Item */}
                <ListItem>
                  <Link
                    to={`/photographers/${photographerId}/new-gallery`}
                    className="flex items-center w-full rounded-lg text-start leading-tight"
                  >
                    <HiPlus className="h-5 w-5" />
                    <Typography color="blue-gray" className="ml-4">
                      Create Gallery
                    </Typography>
                  </Link>
                </ListItem>
                {/* Gallery Title Submenu Item */}
                {gallery && (
                  <ListItem className="flex flex-col">
                    <Link
                      to={`/photographers/${photographerId}/galleries/${gallery.id}`}
                      className="flex items-center w-full rounded-lg text-start leading-tight"
                    >
                      <HiCamera className="h-5 w-5" />
                      <Typography color="blue-gray" className="ml-4">
                        {gallery.title}
                      </Typography>
                    </Link>
                    {/* Add Photo Nested Submenu Item */}
                    {galleryId && (
                      <Link
                        to={`/photographers/${photographerId}/galleries/${galleryId}/upload-photo`}
                        className="flex items-center w-full p-3 rounded-lg text-start leading-tight pl-12"
                      >
                        <HiPlus className="h-5 w-5" />
                        <Typography color="blue-gray" className="ml-4">
                          Add Photo
                        </Typography>
                      </Link>
                    )}
                  </ListItem>
                )}
              </List>
            </AccordionBody>
          </Accordion>
        </List>
      </nav>
    </Card>
  );
};

export default PhotographerSidebar;
