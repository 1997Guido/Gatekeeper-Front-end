import "bootstrap/dist/css/bootstrap.css";
import "./../../css/GlobalStyle.css";
import "./../../css/userprofile.css";
import { useEffect, useState } from "react";
import axiosinstance from "../../api/axiosApi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as TbIcons from "react-icons/tb";
import ProfileEdit from "./ProfileEdit";
import ProfileDelete from "./ProfileDelete";
import ImageUpload from "../ImageUpload";

function UserProfile() {
  const [editmode, seteditmode] = useState("false");
  const [data, setData] = useState([]);
  const [picture, setPicture] = useState([{}]);

  const getProfile = () => {
    axiosinstance.get(`api/profileapi?allusers=me`).then(function (response) {
      const Actualdata = response.data[0];
      console.log(response);
      setData(Actualdata);
    });
  };
  const getProfilePicture = () => {
    axiosinstance
      .get(`api/imageview?allmypictures=profilepicture`)
      .then(function (response) {
        console.log(response);
        setPicture(response.data);
      });
  };
  useEffect(() => {
    getProfile();
    getProfilePicture();
  }, []);
  const url = "http://localhost:8000";
  return (
    <>
      {editmode === "false" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="UserProfileContainer">
            <div className="row">
              <div className="col Userprofile">
                <p className="ProfileTitle">Your Profile</p>
              </div>
            </div>
            <div className="row">
              <div className="col Userprofile ProfilePicture">
                <p>
                  {data.ProfilePicture === null ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => seteditmode("picture")}
                    >
                      Upload Profile Picture
                    </button>
                  ) : (
                    <div>
                      <img
                        className="Image"
                        src={url + picture.Image}
                        alt={picture.Title}
                      />
                    </div>
                  )}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col Userprofile">
                <p>
                  Full name: {data.first_name} {data.last_name}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col Userprofile">
                <p>Date of Birth: {data.date_of_birth}</p>
              </div>
            </div>
            <div className="row">
              <div className="col Userprofile">
                <p>Gender: {data.gender}</p>
              </div>
            </div>
            <div className="row">
              <div className="col Userprofile">
                <p>Email: {data.email}</p>
              </div>
            </div>
            <div className="row">
              <div className="col Userprofile">
                <p>Username: {data.username}</p>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <TbIcons.TbTrash
                  onClick={() => seteditmode("delete")}
                  className="ProfileDeleteButton"
                />
              </div>
              <div className="col">
                <TbIcons.TbEdit
                  onClick={() => seteditmode("edit")}
                  className="ProfileEditButton"
                />
                <button
                  className="btn btn-primary"
                  onClick={() => seteditmode("picture")}
                >
                  Upload Profile Picture
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div>
          {editmode !== "false" ? (
            <TbIcons.TbArrowBackUp
              onClick={function() {seteditmode("false"); getProfile()}}
              className="BackButton"
            />
          ) : null}
          {editmode === "edit" ? <ProfileEdit data={data} /> : null}
          {editmode === "delete" ? <ProfileDelete data={data} /> : null}
          {editmode === "picture" ? <ImageUpload data={"profilepic"} /> : null}
        </div>
      )}
    </>
  );
}

export default UserProfile;