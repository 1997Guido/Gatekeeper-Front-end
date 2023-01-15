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

function UserProfile() {
  const [editmode, seteditmode] = useState("false");
  const [data, setData] = useState([]);

  const getProfile = () => {
    axiosinstance.get(`api/profileapi?allusers=me`).then(function (response) {
      const Actualdata = response.data[0];
      setData(Actualdata);
      console.log(data);
    });
  };
  useEffect(() => {
    getProfile();
  }, []);
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
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div>
          {editmode === "edit" ? <ProfileEdit data={data} /> : null}
          {editmode === "delete" ? <ProfileDelete data={data} /> : null}
        </div>
      )}
      <TbIcons.TbArrowBackUp
        onClick={() => seteditmode("false")}
        className="BackButton"
      />
    </>
  );
}

export default UserProfile;
