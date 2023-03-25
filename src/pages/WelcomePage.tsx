/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./WelcomePage.scss";
import { useNavigate } from "react-router-dom";
import { Pages } from "../constants/pages";

const WelcomePage = () => {

  const navigate = useNavigate();
  const handleRedirectToPage = (page:string) => {
    navigate(`/${page}`);
  };
  
  return (
    <>
      <section className="portfolio-experiment page">
        <h1 className="title">Bank Manager Panel</h1>
        <div className="buttons-container">
          <a onClick={()=>{handleRedirectToPage(Pages.actions)}}>
            <span className="text">Actions</span>
            <span className="line -right"></span>
            <span className="line -top"></span>
            <span className="line -left"></span>
            <span className="line -bottom"></span>
          </a>
          <a onClick={()=>{handleRedirectToPage(Pages.user)}}>
            <span className="text">User</span>
            <span className="line -right"></span>
            <span className="line -top"></span>
            <span className="line -left"></span>
            <span className="line -bottom"></span>
          </a>
        </div>
      </section>
    </>
  );
};

export default WelcomePage;
