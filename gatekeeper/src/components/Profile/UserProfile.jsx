import "bootstrap/dist/css/bootstrap.css";
import "./../../css/Miscellaneous/GlobalStyle.css";
import "./../../css/Profile/userprofile.css";
import { useEffect, useState } from "react";
import axiosinstance from "../../api/axiosApi";
import { motion } from "framer-motion";
import * as TbIcons from "react-icons/tb";
import ProfileEdit from "./ProfileEdit";
import ProfileDelete from "./ProfileDelete";
import ImageUpload from "../Other/ImageUpload";
import * as HiIcons from "react-icons/hi";

function UserProfile() {
  const [editmode, seteditmode] = useState("false");
  const [data, setData] = useState([]);
  const [picture, setPicture] = useState([{}]);
  const [date, setDate] = useState("");
  const getProfile = () => {
    axiosinstance.get(`api/profileapi?allusers=me`).then(function (response) {
      const Actualdata = response.data[0];
      console.log(response);
      setData(Actualdata);
      const date = new Date(Actualdata.date_of_birth);
      const dateEU = date.toLocaleDateString("en-GB");
      setDate(dateEU);
      

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
  const url = "https://guidoerdtsieck.nl/";
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
              <div className="col">
                {data.ProfilePicture === null ? (
                  <TbIcons.TbCamera
                    className="ProfilePictureIcon"
                    onClick={() => seteditmode("picture")}
                  ></TbIcons.TbCamera>
                ) : (
                  <div className="col">
                    <img
                      className="Image"
                      src={url + picture.Image}
                      alt={picture.Title}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="UserProfile">
              <div className="row">
                <div className="col">
                  <HiIcons.HiOutlineUserCircle className="ProfileIcon"></HiIcons.HiOutlineUserCircle>
                  {data.first_name} {data.last_name}
                  <div className="col">
                    <TbIcons.TbCalendar className="ProfileIcon"></TbIcons.TbCalendar>
                    {date}
                  </div>
                  {data.gender === "Undefined" ? (
                    <div>
                      <TbIcons.TbGenderTransgender className="ProfileIcon"></TbIcons.TbGenderTransgender>
                      {data.gender}
                    </div>
                  ) : (
                    <div>
                      {data.gender === "Male" ? (
                        <div>
                          <TbIcons.TbGenderMale className="ProfileIcon"></TbIcons.TbGenderMale>
                          {data.gender}
                        </div>
                      ) : (
                        <div>
                          <TbIcons.TbGenderFemale className="ProfileIcon"></TbIcons.TbGenderFemale>
                          {data.gender}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="col">
                  <HiIcons.HiUserAdd className="ProfileIcon"></HiIcons.HiUserAdd>
                  {data.username}
                  <br />
                </div>
                <div className="row">
                  <div className="col">
                    <HiIcons.HiOutlineMail className="ProfileIcon"></HiIcons.HiOutlineMail>
                    {data.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row ButtonBar">
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
          <div className="heightmaker"></div>
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
