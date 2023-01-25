import axiosInstance from "../api/axiosApi";
import { useState } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./../css/Images.css";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";
import * as TbIcons from "react-icons/tb";
import * as HiIcons from "react-icons/hi";
function ImageUpload() {
  const [PictureEdit, setPictureEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [edit, setEdit] = useState(false);
  const csrftoken = useCookies(["csrftoken"]);
  const [PersonalImages, setPersonalImages] = useState([{}]);
  const [Image, setImage] = useState({
    Title: "",
    Description: "",
    Image: null,
  });
  const handleChange = (event) => {
    setImage({
      ...Image,
      [event.target.name]: event.target.value,
    });
  };
  const handleImageChange = (event) => {
    setImage({
      ...Image,
      Image: event.target.files[0],
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Title", Image.Title);
    formData.append("Description", Image.Description);
    formData.append("Image", Image.Image);
    axiosInstance
      .post("api/imageview", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
        GetPersonalImages();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const GetPersonalImages = () => {
    axiosInstance
      .get("api/imageview?allmypictures=yes")
      .then(function (response) {
        console.log(response);
        setPersonalImages(response.data);
        console.log("Response", response);
        console.log("Personal Images", PersonalImages);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const setProfilePicture = (pictureid) => {
    axiosInstance
      .post(
        "api/setprofileimage",
        { pictureid: pictureid },
        { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteImage = async () => {
    await axiosInstance
      .delete(`/api/imageview?pk=${selectedImage.id}`)
      .then(function (response) {
        GetPersonalImages();
        console.log(response);
      });
  };
  useEffect(() => {
    GetPersonalImages();
  }, []);
  const url = "http://localhost:8000";
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container-fluid">
          <div className="row ImageUpload ImageUploadContainer">
            <div className="ImageBanner">Upload images</div>
            <div className="col">
              <p>You can't upload more than 3 images</p>
              <form className="form-control ImageForm" onSubmit={handleSubmit}>
                <label htmlFor="Title">Title</label>
                <input
                  className="form-control"
                  type="text"
                  name="Title"
                  value={Image.Title}
                  onChange={handleChange}
                />
                <label htmlFor="Description">Description</label>
                <input
                  className="form-control"
                  type="text"
                  name="Description"
                  value={Image.Description}
                  onChange={handleChange}
                />
                <input
                  className="form-control"
                  type="file"
                  name="Image"
                  onChange={handleImageChange}
                />
                <button className="btn btn-primary" type="submit">
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
        {PictureEdit === "PictureSet" ? (
          <div className="success">Profile Picture Set</div>
        ) : null}
        <div>
          {PersonalImages.map((image) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="container-fluid">
                  <div className="row ImageContainer">
                    <div className="col">
                      <div key={image.id}>
                        <img
                          className="Image"
                          src={url + image.Image}
                          alt={image.Title}
                        />
                        <p>Title:{image.Title}</p>
                        <p>Description:{image.Description}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <HiIcons.HiOutlineUserCircle
                          className="SetProfilePictureButton"
                          onClick={function () {
                            setProfilePicture(image.id);
                            setPictureEdit("PictureSet");
                            window.scroll(0, 0)
                          }}
                        ></HiIcons.HiOutlineUserCircle>
                        <TbIcons.TbTrash
                          className="ImageDeleteButton"
                          onClick={function () {
                            setEdit(true);
                            setSelectedImage(image);
                          }}
                        ></TbIcons.TbTrash>
                      </div>
                    </div>
                  </div>
                </div>
                {edit ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="container-fluid UserProfileContainer">
                      <div>Are you sure u want to delete?</div>
                      {selectedImage.Title}
                      <br />
                      <button
                        className="btn btn-primary"
                        onClick={function () {
                          deleteImage();
                          setEdit(false);
                        }}
                      >
                        YES
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => setEdit(false)}
                      >
                        NO
                      </button>
                    </div>
                  </motion.div>
                ) : null}
              </motion.div>
            );
          })}
        </div>

        <div className="heightmaker"></div>
      </motion.div>
    </>
  );
}

export default ImageUpload;
