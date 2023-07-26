import React from "react";
import load from "./components/load.png"
import logo from "./components/logo.png"
import "./Loading_page.css";

const LoadPage = () => {
  return (
    <div className="loadSetting">
      <img className="LogoImagem" src={logo} alt = "LogoMain" />
      <img src={load} alt="Loading" />
      <p className="loadText">Loading</p>
    </div>
  );
};

export default LoadPage;