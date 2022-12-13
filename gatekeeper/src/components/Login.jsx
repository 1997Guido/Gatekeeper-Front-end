import './../css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import './../css/login.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Home from './Home';
import {motion} from "framer-motion";
import validateUserLoggedIn from '../api/ValidateUserLoggedIn';
import { Link } from 'react-router-dom';

function Login(){
  let [isAuth, setIsAuth] = useState(localStorage.getItem('Auth') === 'true' ? true : false);
  useEffect(() => {
    validateUserLoggedIn().then((res) => {
      if(res.data === 'true'){
        setIsAuth(true);
        localStorage.setItem('Auth', true);
      }else{
        setIsAuth(false);
        localStorage.setItem('Auth', false);
      }
    })
  })
    const [Success, setSucces] = useState(false);
    const [LoginInfo, setLoginInfo] = useState({
      username: "",
      password: "",
    });
    const handleChange = (event) => {
      setLoginInfo({ ...LoginInfo, [event.target.name]: event.target.value });
    };
    const handleSubmit = (e) => {
      e.preventDefault()
      axios.post('http://localhost:8000/auth/login/',{
        username: LoginInfo.username,
        password: LoginInfo.password,
          },{withCredentials: true})
          .then(function(response){
            localStorage.setItem("Auth", "true");
            setSucces(true);
            console.log("Logged In");
        });
    };
    return (
  <motion.div
    initial={{ opacity: 0, scale: 0.5}}
    animate={{ opacity: 1, scale: 1}}
    transition={{ duration: 1 }}
  >
          {Success ? (
            <Navigate replace to ="/"/>
          ) : (
      <div className="container-flex loginContainer">
        <form onClick={handleSubmit} className="myForm">
          <div className="form-group myFormGroup">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username" placeholder="Enter username"
            onChange={handleChange} value={LoginInfo.username}/>
          </div>
          <div className="form-group myFormGroup">
            <label htmlFor="Password">Password</label>
            <input type="password" className="form-control" name="password" placeholder="Password"
            onChange={handleChange}/>
          </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <div className='registerButton'>
          Don't have an account? click <Link to='/register'> here</Link> to register.
        </div>
          </form>
      </div>
          )}
    </motion.div>
          );
      }
   
export default Login ;