import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const { auth, signOut } = useAuth();
  const { isAuthenticated } = auth;

  const handleNav = () => {
    setNav(!nav);
  };

  if (!isAuthenticated) {
    return null;
  }

  function getCSRFToken() {
    return document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");
  }

  const handleLogout = async () => {
    try {
      await axios.delete("/photographers/sign_out", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "X-CSRF-Token": getCSRFToken(),
        },
      });
      signOut();
      navigate("/sign_in", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { id: 1, text: "Home" },
    { id: 2, text: "Company" },
    { id: 3, text: "About" },
  ];

  return (
    <div className="flex justify-between items-center h-18 w-full px-4 text-white sticky top-0 bg-black bg-opacity-20 backdrop-blur-sm">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-[#050505]">Lensify.</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 hover:bg-[#060506] rounded-xl m-2 cursor-pointer duration-300 hover:text-white"
          >
            {item.text}
          </li>
        ))}
        <li
          onClick={handleLogout}
          className="p-4 hover:bg-[#070707] rounded-xl m-2 cursor-pointer duration-300 hover:text-white"
        >
          <AiOutlineLogout size={20} />
        </li>
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "fixed top-0 left-[-100%] w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-[#df00c1] m-4">
          Lensify
        </h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b border-gray-600 rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer"
          >
            {item.text}
          </li>
        ))}
        <li
          onClick={handleLogout}
          className="p-4 border-b border-gray-600 rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer"
        >
          <AiOutlineLogout size={20} />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
