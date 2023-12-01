import "bootstrap/dist/css/bootstrap.css";
import "./../../css/Miscellaneous/GlobalStyle.css";
import "./../../css/Profile/userprofile.css";
import { useEffect, useState } from "react";
import axiosinstance from "../../api/axiosApi";
import baseURL from "../../api/axiosApi";
import { motion } from "framer-motion";
import * as TbIcons from "react-icons/tb";
import ProfileEdit from "./ProfileEdit";
import ProfileDelete from "./ProfileDelete";
import ImageUpload from "../Other/ImageUpload";

const mediaURL = process.env.NODE_ENV === 'production' ? "https://guidoerdtsieck.nl" : "http://localhost:8000"
function UserProfile() {
  const [editmode, seteditmode] = useState("false");
  const [data, setData] = useState([]);
  const [picture, setPicture] = useState([{}]);

  const getProfile = () => {
    axiosinstance.get(`api/users?show=me`).then(function (response) {
      const Actualdata = response.data[0];
      console.log(response);
      setData(Actualdata);
    });
  };
  const getProfilePicture = () => {
    axiosinstance
      .get(`api/profilepicture`)
      .then(function (response) {
        console.log(response);
        setPicture(response.data);
      });
  };
  useEffect(() => {
    getProfile();
    getProfilePicture();
  }, []);
  return (
    <>
      {editmode === "false" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="container-fluid UserProfileContainer">
            <div className="row">
              <div className="col Userprofile">
                <p className="ProfileTitle">Your Profile</p>
              </div>
            </div>
            <div className="row">
              <div className="col Userprofile">
                  {data.ProfilePicture === null ? (
                    <TbIcons.TbCamera
                      className="ProfilePictureIcon"
                      onClick={() => seteditmode("picture")}
                    ></TbIcons.TbCamera>
                  ) : (
                    <div className="col">
                      <img
                        className="Image"
                        src={mediaURL + picture.Image}
                        alt={picture.Title}
                      />
                    </div>
                  )}
              </div>
            </div>
            <div className="row">
              <div className="col Userprofile">
                <p>
                  {data.first_name} {data.last_name}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col Userprofile">
                <p>{data.date_of_birth}</p>
              </div>
            </div>
            <div className="row">
              <div className="col Userprofile">
                <p>{data.gender}</p>
              </div>
            </div>
            <div className="row">
              <div className="col Userprofile">
                <p>{data.email}</p>
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
              <div className="col" align="center">
                <TbIcons.TbTrash
                  onClick={() => seteditmode("delete")}
                  className="ProfileDeleteButton"
                />
              </div>
              <div className="col" align="center">
                <TbIcons.TbCamera
                  className="ProfilePictureButton"
                  onClick={() => seteditmode("picture")}
                />
              </div>
              <div className="col" align="center">
                <TbIcons.TbEdit
                  onClick={() => seteditmode("edit")}
                  className="ProfileEditButton"
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div>
          {editmode !== "false" ? (
            <TbIcons.TbArrowBackUp
              onClick={function () {
                seteditmode("false");
                getProfile();
                getProfilePicture();
              }}
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
