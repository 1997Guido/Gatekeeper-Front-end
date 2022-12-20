import 'bootstrap/dist/css/bootstrap.css';
import './../css/register.css'
import { useState } from 'react';
import axios from 'axios';
import {motion} from "framer-motion";
import { Navigate } from 'react-router-dom';

function Register(){
    const [Success, setSucces] = useState(false);
    const [RegisterInfo, setRegisterInfo] = useState({
      username: "",
      password1: "",
      password2: "",
      email: "",
      firstname: "",
      lastname: "",
      date_of_birth: "",
      gender: "",
    });
    const handleChange = (event) => {
      setRegisterInfo({ ...RegisterInfo, [event.target.name]: event.target.value });
    };
    const handleSubmit = (event) => {
      event.preventDefault()
      axios.post('http://localhost:8000/auth/registration/',
      {
        username: RegisterInfo.username,
        email: RegisterInfo.email,
        password1: RegisterInfo.password1,
        password2: RegisterInfo.password2,
        first_name: RegisterInfo.firstname,
        last_name: RegisterInfo.lastname,
        date_of_birth: RegisterInfo.date_of_birth,
      },
      {headers: {
        'Content-Type': 'application/json',
      }},
      {
        withCredentials: true
      })
      .then(function(response){
        console.log(RegisterInfo)
            console.log(response);
            setSucces(true);
        });
    };
    return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5}}
      animate={{ opacity: 1, scale: 1}}
      transition={{ duration: 1 }}
    >
    {Success ? (
      <Navigate replace to ="/login"/>
    ) : (
      <div className="container-flex RegisterContainer">
        <form onSubmit={handleSubmit} className="myFormRegister">
          <div className="myFormGroupRegister">
            <label htmlFor="firstname">Firstname</label>
            <input type="text" className="form-control" name="firstname" placeholder="Enter Firstname"
            onChange={handleChange} value={RegisterInfo.firstname}/>
          </div>

          <div className="myFormGroupRegister">
            <label htmlFor="lastname">Lastname</label>
            <input type="text" className="form-control" name="lastname" placeholder="Enter Lastname"
            onChange={handleChange} value={RegisterInfo.lastname}/>
          </div>
          <div className="myFormGroupRegister">
            <label htmlFor="date_of_birth">Date of birth</label>
            <input type="date" className="form-control" name="date_of_birth" placeholder="Date of birth"
            onChange={handleChange} value={RegisterInfo.date_of_birth}/>
          </div>
          <div className="myFormGroupRegister">
            <label htmlFor="gender" className="label">gender:</label>
              <input type="radio" id="male" name="gender" value='male' checked={RegisterInfo.gender === 'male'}onChange={handleChange}/>
              <label for="male">Male</label>
              <input type="radio" id="female" name="gender" value='female' checked={RegisterInfo.gender === 'female'} onChange={handleChange}/>
              <label for="female">Female</label>
          </div>
          <div className="form-group myFormGroupRegister">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username" placeholder="Enter Username"
            onChange={handleChange} value={RegisterInfo.username}/>
          </div>

          <div className="form-group myFormGroupRegister">
            <label htmlFor="email">Emailadress</label>
            <input type="email" className="form-control" name="email" placeholder="Enter Emailadress"
            onChange={handleChange} value={RegisterInfo.email}/>
          </div>

          <div className="form-group myFormGroupRegister">
            <label htmlFor="Password1">Password</label>
            <input type="password" className="form-control" name="password1" placeholder="Password"
            onChange={handleChange} value={RegisterInfo.password1}/>
          </div>

          <div className="form-group myFormGroupRegister">
            <label htmlFor="Password2">Repeat Password</label>
            <input type="password" className="form-control" name="password2" placeholder="Repeat Password"
            onChange={handleChange} value={RegisterInfo.password2}/>
          </div>

            <button type="submit" className="btn btn-primary">Register</button>
          </form>
      </div>
    )}
          </motion.div>
          );
      }
   
export default Register ;