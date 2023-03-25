import React from "react";
import { Outlet } from "react-router";
import { AiOutlineHome } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
    const navigate = useNavigate();
    const handleRedirectToHome = () =>{
        navigate(`/`);
    }
  return (
    <>
      <nav onClick={handleRedirectToHome} className="home-button-navbar">
        <AiOutlineHome className="lol"/>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
