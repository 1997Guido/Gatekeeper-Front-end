
import {useHistory} from 'react-router-dom'
import { useLocation } from 'react-router-dom'


function selectNav(pagy){
  const loca = window.location.pathname;
    if(pagy !== "home"){
      document.getElementById("home").classList.remove("logosel")
      document.getElementById("qrpage").classList.remove("iconsel")
      document.getElementById("admin").classList.remove("iconsel")
      document.getElementById("userprofile").classList.remove("iconsel")
      document.getElementById("events").classList.remove("iconsel")
      let id = document.getElementById(pagy)
      id.classList.add("iconsel")
    }
    else{
      document.getElementById("home").classList.remove("logosel")
      document.getElementById("qrpage").classList.remove("iconsel")
      document.getElementById("admin").classList.remove("iconsel")
      document.getElementById("userprofile").classList.remove("iconsel")
      document.getElementById("events").classList.remove("iconsel")
      let id = document.getElementById(pagy)
      id.classList.add("logosel")
    }
  }

  export default selectNav;