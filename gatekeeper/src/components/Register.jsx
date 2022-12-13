import './../css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import './../css/register.css'
import { useState } from 'react';
import axios from 'axios';
import {motion} from "framer-motion";
import { Link } from 'react-router-dom';
function Register(){
    const [Success, setSucces] = useState(false);  
    const [RegisterInfo, setRegisterInfo] = useState({
      username: "",
      password: "",
    });
    const handleChange = (event) => {
      setRegisterInfo({ ...RegisterInfo, [event.target.name]: event.target.value });
    };
    const handleSubmit = (event) => {
      axios.post('http://localhost:8000/auth/register',
      {
        name: RegisterInfo.name,
        email: RegisterInfo.email,
        message: RegisterInfo.message
      },
      {
        withCredentials: true
      })
      .then(function(response){
            console.log(response);
        });
        console.log(RegisterInfo);
    };
    return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5}}
      animate={{ opacity: 1, scale: 1}}
      transition={{ duration: 1 }}
    >
      <div className="container-flex LoginContainer">
        <form onClick={handleSubmit} className="myForm">
          <div className="form-group myFormGroup">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username" placeholder="Enter Username"
            onChange={handleChange} value={RegisterInfo.username}/>
          </div>
          <div className="form-group myFormGroup">
            <label htmlFor="email">Emailadress</label>
            <input type="email" className="form-control" name="email" placeholder="Enter Emailadress"
            onChange={handleChange} value={RegisterInfo.email}/>
          </div>
          <div className="form-group myFormGroup">
            <label htmlFor="Password1">Password</label>
            <input type="password" className="form-control" name="password1" placeholder="Password"
            onChange={handleChange}/>
          </div>
          <div className="form-group myFormGroup">
            <label htmlFor="Password2">Repeat Password</label>
            <input type="password" className="form-control" name="password2" placeholder="Repeat Password"
            onChange={handleChange}/>
          </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
      </div>
          </motion.div>
          );
      }
   
export default Register ;