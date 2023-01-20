import axiosInstance from "../api/axiosApi";
import { useState } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./../css/Images.css";
import { useCookies } from "react-cookie";

function ImageUpload() {
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
        .post("api/setprofileimage", {pictureid: pictureid}, { headers: { "X-CSRFToken": csrftoken[0].csrftoken } })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    };
  useEffect(() => {
    GetPersonalImages();
  }, []);
  const url = "http://gatekeeper.uksouth.cloudapp.azure.com/";
  return (
    <>
      <div className="container-fluid">
        <div className="row ImageUpload ImageUploadContainer">
          <div className="ImageBanner">Upload images</div>
          <div className="col">
            <p>You can't upload more than 3 images</p>
            <form className="form-control" onSubmit={handleSubmit}>
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
              <input className="form-control" type="file" name="Image" onChange={handleImageChange} />
              <button className="btn btn-primary" type="submit">Upload</button>
            </form>
          </div>
        </div>
      </div>
      <div className="row ImageContainer">
        <div className="col">
          {PersonalImages.map((image) => {
            return (
              <div key={image.id}>
                <img
                  className="Image"
                  src={url + image.Image}
                  alt={image.Title}
                />
                <p>Title:{image.Title}</p>
                <p>Description:{image.Description}</p>
                <button className="btn btn-primary" onClick={() => setProfilePicture(image.id)}>Set ProfilePicture</button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="heightmaker"></div>
    </>
  );
}

export default ImageUpload;
