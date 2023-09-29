import React from "react";
import axiosinstance from "../../api/axiosApi";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import "./../../css/Profile/ProfileEdit.css";
import UserProfile from "./UserProfile";

function ProfileEdit(data) {
  const [Success, setSuccess] = useState(false);
  const [error, setError] = useState("no error");
  const csrftoken = useCookies(["csrftoken"]);
  const [ProfileInfo, setProfileInfo] = useState({
    username: data.data.username,
    email: data.data.email,
    firstname: data.data.first_name,
    lastname: data.data.last_name,
    date_of_birth: data.data.date_of_birth,
    gender: data.data.gender,
    agree: data.data.agree,
  });
  const handleChange = (event) => {
    setProfileInfo({
      ...ProfileInfo,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    let date = new Date(ProfileInfo.date_of_birth);
    let maxdate = new Date("2012-01-01");
    if (date > maxdate) {
      alert("You must be at least 18 years old");
    } else {
    window.scrollTo(0, 0);
      event.preventDefault();
      console.log(ProfileInfo.gender);
      axiosinstance
        .patch(
          "/api/userupdate",
          {
            username: ProfileInfo.username,
            email: ProfileInfo.email,
            password1: ProfileInfo.password1,
            password2: ProfileInfo.password2,
            first_name: ProfileInfo.firstname,
            last_name: ProfileInfo.lastname,
            date_of_birth: ProfileInfo.date_of_birth,
            gender: ProfileInfo.gender,
            agree: ProfileInfo.agree,
          },
          { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
        )
        .then(function (response) {
          setSuccess(true);
        })
        .catch(function (error) {
          setSuccess(false);
          console.log("error", error.response.data);
          setError(error.response.data);
        });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {Success ? (
        <UserProfile />
      ) : (
        <div className="container-flex ProfileContainer">
          <form onSubmit={handleSubmit} className="myFormProfile">
            <div className="myFormGroupProfile">
              <label htmlFor="firstname">Firstname</label>
              {error !== "no error" ? (
                <div className="error">{error.first_name}</div>
              ) : null}
              <input
                type="text"
                className="form-control"
                name="firstname"
                placeholder="Enter Firstname"
                onChange={handleChange}
                value={ProfileInfo.firstname}
              />
            </div>

            <div className="myFormGroupProfile">
              <label htmlFor="lastname">Lastname</label>
              {error !== "no error" ? (
                <div className="error">{error.last_name}</div>
              ) : null}
              <input
                type="text"
                className="form-control"
                name="lastname"
                placeholder="Enter Lastname"
                onChange={handleChange}
                value={ProfileInfo.lastname}
              />
            </div>
            <div className="myFormGroupProfile">
              {error !== "no error" ? (
                <div className="error">{error.date_of_birth}</div>
              ) : null}
              <label htmlFor="date_of_birth">Date of birth</label>
              <input
                type="date"
                className="form-control"
                name="date_of_birth"
                placeholder="Date of birth"
                onChange={handleChange}
                value={ProfileInfo.date_of_birth}
              />
            </div>
            <div className="myFormGroupProfile">
              <p>Gender:</p>
              {error !== "no error" ? (
                <div className="error">{error.gender}</div>
              ) : null}
              <input
                className="form-check-input genderradio"
                type="radio"
                id="Male"
                name="gender"
                value="Male"
                checked={ProfileInfo.gender === "Male"}
                onChange={handleChange}
              />
              Male
              <input
                className="form-check-input genderradio"
                type="radio"
                id="Female"
                name="gender"
                value="Female"
                checked={ProfileInfo.gender === "Female"}
                onChange={handleChange}
              />
              Female
              <br />
              <input
                className="form-check-input genderradio"
                type="radio"
                id="Undefined"
                name="gender"
                value="Undefined"
                checked={ProfileInfo.gender === "Undefined"}
                onChange={handleChange}
              />
              Undefined
            </div>
            <div className="form-group myFormGroupProfile">
              <label htmlFor="username">Username</label>
              {error !== "no error" ? (
                <div className="error">{error.username}</div>
              ) : null}
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter Username"
                onChange={handleChange}
                value={ProfileInfo.username}
              />
            </div>
            <div className="form-group myFormGroupProfile">
              <label htmlFor="email">Emailadress</label>
              {error !== "no error" ? (
                <div className="error">{error.email}</div>
              ) : null}
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Emailadress"
                onChange={handleChange}
                value={ProfileInfo.email}
              />
            </div>

            <button type="ProfileButton" className="btn btn-primary">
              Update    
            </button>
          </form>
          <div className="heightmaker"></div>
        </div>
      )}
    </motion.div>
  );
}

export default ProfileEdit;
