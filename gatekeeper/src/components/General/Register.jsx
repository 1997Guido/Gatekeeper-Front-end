import "bootstrap/dist/css/bootstrap.css";
import "./../../css/General/register.css";
import "./../../css/Miscellaneous/GlobalStyle.css";
import { useState } from "react";
import axiosinstance from "../../api/axiosApi";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import * as TbIcons from "react-icons/tb";
import TermsOfUse from "../Other/TermsOfUse";
function Register() {
  const [TermsChecked, setTermsChecked] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [Terms, setTerms] = useState(false);
  const [error, setError] = useState("no error");
  const csrftoken = useCookies(["csrftoken"]);
  const [RegisterInfo, setRegisterInfo] = useState({
    username: "",
    password1: "",
    password2: "",
    email: "",
    firstname: "",
    lastname: "",
    date_of_birth: "",
    gender: "",
    agree: TermsChecked,
  });
  const handleChange = (event) => {
    setRegisterInfo({
      ...RegisterInfo,
      [event.target.name]: event.target.value,
    });
    console.log(RegisterInfo.agree);
  };
  console.log(Terms);
  const handleSubmit = (event) => {
    let date = new Date(RegisterInfo.date_of_birth);
    let maxdate = new Date("2012-01-01");
    if (date > maxdate) {
      alert("You must be at least 10 years old to register");
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
      event.preventDefault();
      console.log(RegisterInfo.gender);
      axiosinstance
        .post(
          "/auth/registration/",
          {
            username: RegisterInfo.username,
            email: RegisterInfo.email,
            password1: RegisterInfo.password1,
            password2: RegisterInfo.password2,
            first_name: RegisterInfo.firstname,
            last_name: RegisterInfo.lastname,
            date_of_birth: RegisterInfo.date_of_birth,
            gender: RegisterInfo.gender,
            agree: TermsChecked,
          },
          { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
        )
        .then(function (response) {
          setSuccess(true);
        })
        .catch(function (error) {
          setSuccess(false);
          console.log("error", error.response.data);
          setError(error.response.data);
        });
    }
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
        <div className="container-flex RegisterContainer">
          <form onSubmit={handleSubmit} className="myFormRegister">
          {error !== "no error" ? (
                <div className="error">{error.non_field_errors}</div>
              ) : null}
            <div className="myFormGroupRegister">
              <label htmlFor="firstname">Firstname</label>
              {error !== "no error" ? (
                <div className="error">{error.first_name}</div>
              ) : null}
              <input
                type="text"
                className="form-control"
                name="firstname"
                placeholder="Enter Firstname"
                onChange={handleChange}
                value={RegisterInfo.firstname}
              />
            </div>

            <div className="myFormGroupRegister">
              <label htmlFor="lastname">Lastname</label>
              {error !== "no error" ? (
                <div className="error">{error.last_name}</div>
              ) : null}
              <input
                type="text"
                className="form-control"
                name="lastname"
                placeholder="Enter Lastname"
                onChange={handleChange}
                value={RegisterInfo.lastname}
              />
            </div>
            <div className="myFormGroupRegister">
              {error !== "no error" ? (
                <div className="error">{error.date_of_birth}</div>
              ) : null}
              <label htmlFor="date_of_birth">Date of birth</label>
              <input
                type="date"
                className="form-control"
                name="date_of_birth"
                placeholder="Date of birth"
                onChange={handleChange}
                value={RegisterInfo.date_of_birth}
              />
            </div>
            <div className="myFormGroupRegister">
              <p>Gender:</p>
              {error !== "no error" ? (
                <div className="error">{error.gender}</div>
              ) : null}
              <input
                className="form-check-input genderradio"
                type="radio"
                id="Male"
                name="gender"
                value="Male"
                checked={RegisterInfo.gender === "Male"}
                onChange={handleChange}
              />
              Male
              <input
                className="form-check-input genderradio"
                type="radio"
                id="Female"
                name="gender"
                value="Female"
                checked={RegisterInfo.gender === "Female"}
                onChange={handleChange}
              />
              Female
              <br />
              <input
                className="form-check-input genderradio"
                type="radio"
                id="Undefined"
                name="gender"
                value="Undefined"
                checked={RegisterInfo.gender === "Undefined"}
                onChange={handleChange}
              />
              Undefined
            </div>
            <div className="form-group myFormGroupRegister">
              <label htmlFor="username">Username</label>
              {error !== "no error" ? (
                <div className="error">{error.email}</div>
              ) : null}
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter Username"
                onChange={handleChange}
                value={RegisterInfo.username}
              />
            </div>
            <div className="form-group myFormGroupRegister">
              <label htmlFor="email">Emailadress</label>
              {error !== "no error" ? (
                <div className="error">{error.email}</div>
              ) : null}
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Emailadress"
                onChange={handleChange}
                value={RegisterInfo.email}
              />
            </div>

            <div className="form-group myFormGroupRegister">
              <label htmlFor="Password1">Password</label>
              {error !== "no error" ? (
                <div className="error">{error.password1}</div>
              ) : null}
              <input
                type="password"
                className="form-control"
                name="password1"
                placeholder="Password"
                onChange={handleChange}
                value={RegisterInfo.password1}
              />
            </div>

            <div className="form-group myFormGroupRegister">
              <label htmlFor="Password2">Repeat Password</label>
              {error !== "no error" ? (
                <div className="error">{error.password2}</div>
              ) : null}
              <input
                type="password"
                className="form-control"
                name="password2"
                placeholder="Repeat Password"
                onChange={handleChange}
                value={RegisterInfo.password2}
              />
            </div>
            <div className="myFormGroupProfile">
            <label htmlFor="agree">
                I read the Terms of Service and Privacy Policy on the bottom of this page. And i agree to them.
              </label>
            <input
                className="form-check-input CheckBox"
                type="checkbox"
                checked={TermsChecked}
                onChange={() => setTermsChecked(!TermsChecked)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
          <Link to="/login">
            <TbIcons.TbArrowBackUp className="BackButton" />
          </Link>
        </div>
      )}
      <div>
        {TermsChecked ? (null) : (<TermsOfUse />)}
      </div>
      <div className="heightmaker"></div>
    </motion.div>
  );
}

export default Register;
