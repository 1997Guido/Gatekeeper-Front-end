import "./../../css/Miscellaneous/GlobalStyle.css";
import "bootstrap/dist/css/bootstrap.css";
import "./../../css/General/login.css";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosApi";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import validateUserLoggedIn from "../../api/ValidateUserLoggedIn";
import { Link } from "react-router-dom";

function Login() {
  let [isAuth, setIsAuth] = useState(
    localStorage.getItem("Auth") === "true" ? true : false
  );
  const [Success, setSucces] = useState(false);
  const [LoginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const handleChange = (event) => {
    setLoginInfo({ ...LoginInfo, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/auth/login/", {
        username: LoginInfo.username,
        password: LoginInfo.password,
      })
      .then(function (response) {
        localStorage.setItem("Auth", "true");
        localStorage.setItem("userpk", response.data.user.pk);
        setSucces(true);
        console.log("Logged In");
      });
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {Success ? (
        <Navigate replace to="/" />
      ) : (
        <div className="container-flex loginContainer">
          <form onSubmit={handleSubmit} className="myForm">
            <div className="form-group myFormGroup">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter username"
                onChange={handleChange}
                value={LoginInfo.username}
              />
            </div>
            <div className="form-group myFormGroup">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <div className="registerButton">
              Don't have an account? click <Link to="/register"> here</Link> to
              register.
            </div>
          </form>

          <div className="Copyright">
            <p>
              Copyright &copy; {new Date().getFullYear()} Guido Erdtsieck and
              Mike Vermeer
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Login;
