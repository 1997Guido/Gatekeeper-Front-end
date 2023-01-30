//© 2023 Mike Vermeer & Guido Erdtsieck. All rights reserved.

function selectNav(loca){
  if (loca === ""){
    loca = "home"
  }
    if(loca !== "home"){
      document.getElementById("home").classList.remove("logosel")
      document.getElementById("qrpage").classList.remove("iconsel")
      document.getElementById("scanner").classList.remove("iconsel")
      document.getElementById("userprofile").classList.remove("iconsel")
      document.getElementById("events").classList.remove("iconsel")
      let id = document.getElementById(loca)
      id.classList.add("iconsel")
    }
    else{
      document.getElementById("home").classList.remove("logosel")
      document.getElementById("qrpage").classList.remove("iconsel")
      document.getElementById("scanner").classList.remove("iconsel")
      document.getElementById("userprofile").classList.remove("iconsel")
      document.getElementById("events").classList.remove("iconsel")
      let id = document.getElementById(loca)
      id.classList.add("logosel")
    }
  }

  export default selectNav;