function ImageUpload() {
    const [image, setImage] = useState({
        title: "",
        description: "",
        image: null,
    });
    const handleChange = (event) => {
        setImage({
          ...image,
          [event.target.name]: event.target.value,
        });
      };
    const handleImageChange = (event) => {
        setImage({
            ...image,
            image: event.target.files[0],
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", image.title);
        formData.append("description", image.description);
        formData.append("image", image.image);
        axiosInstance
            .post("api/imageuploadapi", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={image.title} onChange={handleChange} />
                <input type="text" name="description" value={image.description} onChange={handleChange} />
                <input type="file" name="image" onChange={handleImageChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
     );
}

export default ImageUpload;