import React, { useEffect, useState } from "react";
import axiosinstance from "../../api/axiosApi";
import { motion } from "framer-motion";
import * as TbIcons from "react-icons/tb";
import ProfileEdit from "./ProfileEdit";
import ProfileDelete from "./ProfileDelete";
import ImageUpload from "../Other/ImageUpload";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "bootstrap/dist/css/bootstrap.min.css";

const mediaURL = process.env.NODE_ENV === "production" ? "https://guidoerdtsieck.nl" : "http://localhost:8000";

function UserProfile() {
  const [editmode, seteditmode] = useState("false");
  const [data, setData] = useState([]);
  const [picture, setPicture] = useState([{}]);

  const getProfile = async () => {
    try {
      const response = await axiosinstance.get(`api/users?show=me`);
      setData(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getProfilePicture = async () => {
    try {
      const response = await axiosinstance.get(`api/profilepicture`);
      setPicture(response.data);
    } catch (error) {
      console.error(error);
    }
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
          className="container py-3"
        >
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h2 className="text-center mb-4">Your Profile</h2>
              <div className="text-center">
                {data.ProfilePicture === null ? (
                  <TbIcons.TbCamera
                    onClick={() => seteditmode("picture")}
                    style={{ fontSize: '3rem', cursor: 'pointer' }}
                  />
                ) : (
                  <LazyLoadImage
                    alt={picture.Title}
                    src={mediaURL + picture.Image}
                    effect="blur"
                    className="img-fluid mb-3"
                  />
                )}
                <p>{data.first_name} {data.last_name}</p>
                <p>{data.date_of_birth}</p>
                <p>{data.gender}</p>
                <p>{data.email}</p>
                <p>Username: {data.username}</p>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <TbIcons.TbTrash
                  onClick={() => seteditmode("delete")}
                  style={{ cursor: 'pointer', fontSize: '2.5rem', color: '#dc3545' }}
                />
                <TbIcons.TbCamera
                  onClick={() => seteditmode("picture")}
                  style={{ cursor: 'pointer', fontSize: '2.5rem', color: '#ffc107', margin: '0 15px' }}
                />
                <TbIcons.TbEdit
                  onClick={() => seteditmode("edit")}
                  style={{ cursor: 'pointer', fontSize: '2.5rem', color: '#28a745' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div>
          {editmode !== "false" && (
            <TbIcons.TbArrowBackUp
              onClick={() => {
                seteditmode("false");
                getProfile();
                getProfilePicture();
              }}
              className="BackButton"
              style={{ cursor: 'pointer', fontSize: '2rem' }}
            />
          )}
          {editmode === "edit" && <ProfileEdit data={data} />}
          {editmode === "delete" && <ProfileDelete data={data} />}
          {editmode === "picture" && <ImageUpload data={"profilepic"} />}
        </div>
      )}
    </>
  );
}

export default UserProfile;
