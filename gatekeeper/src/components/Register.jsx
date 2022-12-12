import './../css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import './../css/register.css'
import { useState } from 'react';
import axios from 'axios';
import {motion} from "framer-motion";

function Register(){  
    const [RegisterInfo, setRegisterInfo] = useState({
      username: "",
      password: "",
    });
    const handleChange = (event) => {
      setRegisterInfo({ ...RegisterInfo, [event.target.name]: event.target.value });
    };
    const handleSubmit = (event) => {
      axios.post('http://localhost:8000/register', 
      {method: 'post',
      headers: {
        'Content-Type': 'application/json'
    },
    data: {
        name: RegisterInfo.name,
        email: RegisterInfo.email,
        message: RegisterInfo.message
          }}).then(function(response){
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
          <form className="myForm">
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword2">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Repeat password"/>
            </div>
              <button type="submit" class="btn btn-primary">Register</button>
          </form>
          </motion.div>
          );
      }
   
export default Register ;