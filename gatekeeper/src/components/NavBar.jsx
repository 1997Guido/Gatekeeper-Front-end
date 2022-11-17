import './../css/style.css'
import './../css/mNav.css'
import 'bootstrap/dist/css/bootstrap.css';
import logo from './../images/alleenschedel.png';
import * as TbIcons from "react-icons/tb";
import * as MdIcons from "react-icons/md";
import React, { Component } from 'react';
import banner from './../images/balkjeeffect.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    function selectNav(pagy){
      if(pagy != "home"){
        document.getElementById("home").classList.remove("logosel")
        document.getElementById("events").classList.remove("iconsel")
        document.getElementById("contact").classList.remove("iconsel")
        document.getElementById("store").classList.remove("iconsel")
        document.getElementById("live").classList.remove("iconsel")
        let id = document.getElementById(pagy)
        id.classList.add("iconsel")
      }
      else{
        document.getElementById("home").classList.remove("logosel")
        document.getElementById("events").classList.remove("iconsel")
        document.getElementById("contact").classList.remove("iconsel")
        document.getElementById("store").classList.remove("iconsel")
        document.getElementById("live").classList.remove("iconsel")
        let id = document.getElementById(pagy)
        id.classList.add("logosel")
      }
  } 
    return (
        <>
      <header>
        <img className='banner' src={banner}></img>
      </header>
        <nav className="mobile-nav">
          <Link to='/events' className="bloc-icon" >
          <TbIcons.TbCalendarMinus id='events' className='icons' onClick={() => selectNav("events")}/>
          </Link>
          <Link to='/admin' className="bloc-icon">
          <TbIcons.TbVideo id="live" className='icons' onClick={() => selectNav("admin")}/>
          </Link>
          <Link to='/' className="bloc-logo">
              <img src={logo} id='home' alt="" onClick={() => selectNav("home")}/>
          </Link>
          <Link to='/userprofile' className="bloc-icon">
          <MdIcons.MdOutlineContactPage id="contact" className='icons' onClick={() => selectNav("userprofile")}/>
          </Link>
          <Link to='/userqr' className="bloc-icon">
          <TbIcons.TbBuildingStore id="store" className='icons' onClick={() => selectNav("userqr")}/>
          </Link>
        </nav>
        </>
    );
  }
}
 
export default Nav;
