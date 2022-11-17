import './../css/style.css'
import './../css/mNav.css'
import 'bootstrap/dist/css/bootstrap.css';
import logo from './../images/alleenschedel.png';
import * as TbIcons from "react-icons/tb";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import React, { Component } from 'react';
import banner from './../images/balkjeeffect.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    function selectNav(pagy){
      if(pagy != "home"){
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
      <header>
        <h1 className='Title'>GateKeeper</h1>
      </header>
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
          <HiIcons.HiFingerPrint id="userqr" className='icons' onClick={() => selectNav("userqr")}/>
          </Link>
        </nav>
        </>
    );
  }
}
 
export default Nav;
