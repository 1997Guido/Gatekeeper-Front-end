import "./../../css/Miscellaneous/GlobalStyle.css";
import "./../../css/General/home.css";
import "bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import { useState } from "react";
import axiosInstance from "../../api/axiosApi";
import { useEffect } from "react";

function Home() {
  const [data, setData] = useState([]);

  const getProfile = () => {
    axiosInstance.get(`api/profileapi?allusers=me`).then(function (response) {
      const Actualdata = response.data[0];
      console.log(response);
      setData(Actualdata);
    });
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container-fluid HomeContainer">
        <div className="HomeTitle">Welcome</div>
          <div className="row">
            <div className="col text">
              <p className="UserName">{data.first_name}</p>
              <p>
                To our event planning webapp!
                <br />
                We make it easy to create and manage beautiful event pages,
                customize with all the necessary details, and invite your guests
                with ease. Plus, our unique QR code scanning feature allows you
                to easily check guests in and keep track of who has arrived,
                ensuring only those on the invite list are able to attend.
                <br /> Get started now and make your next event a{" "}
                <strong>success!</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="Copyright">
          <p>Copyright &copy; {new Date().getFullYear()} Guido Erdtsieck and Mike Vermeer</p>
        </div>
      </motion.div>
    </>
  );
}

export default Home;