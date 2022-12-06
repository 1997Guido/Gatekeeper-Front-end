import './../css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import './../css/login.css'
import { useState } from 'react';
import axios from 'axios';


function Login(){  
    const [LoginInfo, setLoginInfo] = useState({
      username: "",
      password: "",
    });
    const handleChange = (event) => {
      setLoginInfo({ ...LoginInfo, [event.target.name]: event.target.value });
    };
    const handleSubmit = (event) => {
      axios.post('http://localhost:8000/auth/login/', 
      {method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
    },
        username: LoginInfo.username,
        password: LoginInfo.password,
          }).then(function(response){
            console.log(response);
        });
        console.log(LoginInfo);
    };
    return (
          <>
          <form onClick={handleSubmit} className="myForm">
            <div className="form-group">
              <label htmlFor="username">username</label>
              <input type="text" className="form-control" name="username" placeholder="Enter username"
              onChange={handleChange} value={LoginInfo.username}/>
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password"
              onChange={handleChange}/>
            </div>
              <button type="submit" className="btn btn-primary">Login</button>
          </form>
          </>
          );
      }
   
export default Login ;