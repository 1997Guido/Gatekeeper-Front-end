import './../css/GlobalStyle.css'
import "./../css/mNav.css";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./../images/gatepng.png";
import * as HiIcons from "react-icons/hi";
import * as TbIcons from "react-icons/tb";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import HeaderFooter from "./HeaderFooter";
import { motion } from "framer-motion";
import selectNav from "../functions/selectNav";

function Nav() {
  return (
    <div>
      <nav className="mobile-nav">
        <Link to="/qrpage" className="bloc-icon">
          <HiIcons.HiOutlineQrcode
            id="qrpage"
            className="icons"
            onClick={() => selectNav("qrpage")}
          />
        </Link>
        <Link to="/admin" className="bloc-icon">
          <HiIcons.HiLogin
            id="admin"
            className="icons"
            onClick={() => selectNav("admin")}
          />
        </Link>
        <Link to="/" className="bloc-logo">
          <img src={logo} id="home" alt="" onClick={() => selectNav("home")} />
        </Link>
        <Link to="/userprofile" className="bloc-icon">
          <HiIcons.HiOutlineUserCircle
            id="userprofile"
            className="icons"
            onClick={() => selectNav("userprofile")}
          />
        </Link>
        <Link to="/events" className="bloc-icon">
          <TbIcons.TbCalendarMinus
            id="events"
            className="icons"
            onClick={() => selectNav("events")}
          />
        </Link>
      </nav>
    </div>
  );
}

export default Nav;
