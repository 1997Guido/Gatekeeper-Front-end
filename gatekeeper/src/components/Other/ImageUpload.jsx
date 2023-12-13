import "./../../css/Miscellaneous/Images.css";
import axiosInstance from "../../api/axiosApi";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";
import * as TbIcons from "react-icons/tb";
import * as HiIcons from "react-icons/hi";

const mediaURL = process.env.NODE_ENV === 'production' ? "https://guidoerdtsieck.nl" : "http://localhost:8000";

function ImageUpload() {
  const [pictureEdit, setPictureEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [edit, setEdit] = useState(false);
  let csrftoken = useCookies(["csrftoken"]);
  const [personalImages, setPersonalImages] = useState([]);
  const [image, setImage] = useState({ Title: "", Description: "", Image: null });

  useEffect(() => {
    getPersonalImages();
  }, []);

  const handleChange = (event) => {
    setImage({ ...image, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setImage({ ...image, Image: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Title", image.Title);
    formData.append("Description", image.Description);
    formData.append("Image", image.Image);

    axiosInstance.post("api/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then(getPersonalImages)
      .catch(console.error);
  };

  const getPersonalImages = () => {
    axiosInstance.get("api/image?show=owned")
      .then((response) => setPersonalImages(response.data))
      .catch(console.error);
  };

  const setProfilePicture = (pictureId) => {
    axiosInstance.patch(`api/profilepicture/${pictureId}/`, {
      headers: { "X-CSRFToken": csrftoken[0].csrftoken }
    }).then(() => {
      setPictureEdit(true);
      window.scrollTo(0, 0);
    }).catch(console.error);
  };

  const deleteImage = async (imageId) => {
    await axiosInstance.delete(`/api/image/${imageId}/`)
      .then(() => {
        getPersonalImages();
        setEdit(false);
      }).catch(console.error);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="container mt-3"
    >
      <div className="row justify-content-center">
        <div className="col-10 mb-3 bg-dark">
          <h3 className="text-center text-white mb-3">Upload images</h3>
          <p className="text-center text-white-50">You can't upload more than 3 images</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label text-white">Title</label>
              <input
                className="form-control"
                type="text"
                name="Title"
                value={image.Title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label text-white">Description</label>
              <input
                className="form-control"
                type="text"
                name="Description"
                value={image.Description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="file"
                name="Image"
                onChange={handleImageChange}
              />
            </div>
            <div className="text-center">
              <button className="btn btn-primary" type="submit">Upload</button>
            </div>
          </form>
        </div>
      </div>

      {pictureEdit && (
        <div className="alert alert-success" role="alert">
          Profile Picture Set
        </div>
      )}

      {personalImages.map((image, index) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          key={image.id || index} // Fallback to index if id is not available
          className="row justify-content-center mb-4"
        >
          <div className="col-md-8">
            <div className="bg-dark text-white p-3 rounded">
              <img
                className="img-fluid mb-3"
                src={`${mediaURL}${image.Image}`}
                alt={image.Title}
              />
              <h5>Title: {image.Title}</h5>
              <p>Description: {image.Description}</p>
              <div className="text-center">
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
        </motion.div>
      ))}

      {edit && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="row justify-content-center"
        >
          <div className="col-md-8 text-center">
            <div className="bg-dark text-white p-3 rounded">
              <p>Are you sure you want to delete?</p>
              <p>{selectedImage.Title}</p>
              <button
                className="btn btn-danger me-2"
                onClick={() => deleteImage(selectedImage.id)}
              >
                YES
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEdit(false)}
              >
                NO
              </button>
            </div>
          </div>
        </motion.div>
      )}
      <div className="heightmaker"></div>
    </motion.div>
  );
}

export default ImageUpload;