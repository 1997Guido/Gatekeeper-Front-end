import './../css/style.css'
import './../css/mNav.css'
import 'bootstrap/dist/css/bootstrap.css';
import logo from './../images/torri3.png';
import * as HiIcons from "react-icons/hi";
import * as TbIcons from "react-icons/tb";
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import HeaderFooter from './HeaderFooter';
import {motion} from "framer-motion";


function Nav() {
    function selectNav(pagy){
      if(pagy !== "home"){
        document.getElementById("home").classList.remove("logosel")
        document.getElementById("adminqr").classList.remove("iconsel")
        document.getElementById("admin").classList.remove("iconsel")
        document.getElementById("userprofile").classList.remove("iconsel")
        document.getElementById("userqr").classList.remove("iconsel")
        let id = document.getElementById(pagy)
        id.classList.add("iconsel")
      }
      else{
        document.getElementById("home").classList.remove("logosel")
        document.getElementById("adminqr").classList.remove("iconsel")
        document.getElementById("admin").classList.remove("iconsel")
        document.getElementById("userprofile").classList.remove("iconsel")
        document.getElementById("userqr").classList.remove("iconsel")
        let id = document.getElementById(pagy)
        id.classList.add("logosel")
      }
  } 
    return (
      <>
          <div>
                <nav className="mobile-nav">
                  <Link to='/adminqr' className="bloc-icon" >
                  <HiIcons.HiOutlineQrcode id='adminqr' className='icons' onClick={() => selectNav("adminqr")}/>
                  </Link>
                  <Link to='/admin' className="bloc-icon">
                  <HiIcons.HiLogin id="admin" className='icons' onClick={() => selectNav("admin")}/>
                  </Link>
                  <Link to='/' className="bloc-logo">
                      <img src={logo} id='home' alt="" onClick={() => selectNav("home")}/>
                  </Link>
                  <Link to='/userprofile' className="bloc-icon">
                  <HiIcons.HiOutlineUserCircle id="userprofile" className='icons' onClick={() => selectNav("userprofile")}/>
                  </Link>
                  <Link to='/userqr' className="bloc-icon">
                  <TbIcons.TbCalendarMinus id="userqr" className='icons' onClick={() => selectNav("userqr")}/>
                  </Link>
                </nav>
          </div>
    </>
    );
  }
 
export default Nav;
