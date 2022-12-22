import 'bootstrap/dist/css/bootstrap.css';
import './../css/register.css'
import { useState } from 'react';
import axiosinstance from './../api/axiosApi';
import {motion} from "framer-motion";
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Register(){
    const [Success, setSuccess] = useState(false);
    const [error, setError] = useState('no error');
    const csrftoken = useCookies(['csrftoken'])
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
      console.log(RegisterInfo.gender)
      axiosinstance.post('/auth/registration/',
      {
        username: RegisterInfo.username,
        email: RegisterInfo.email,
        password1: RegisterInfo.password1,
        password2: RegisterInfo.password2,
        first_name: RegisterInfo.firstname,
        last_name: RegisterInfo.lastname,
        date_of_birth: RegisterInfo.date_of_birth,
        gender: RegisterInfo.gender,
      },
      {headers: {'X-CSRFToken': csrftoken[0].csrftoken}})
      .then(function(response){
          setSuccess(true);
        }).catch(function(error){
          setSuccess(false);
          console.log(error.response.data)
          setError(error)
        })
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
              <input className='form-check-input' type="radio" id="Male" name="gender" value='Male' checked={RegisterInfo.gender === 'Male'} onChange={handleChange}/>
              Male<br/>
              <input className='form-check-input' type="radio" id="Female" name="gender" value='Female' checked={RegisterInfo.gender === 'Female'} onChange={handleChange}/>
              Female<br/>
              <input className='form-check-input' type="radio" id="Undefined" name="gender" value='Undefined' checked={RegisterInfo.gender === 'Undefined'} onChange={handleChange}/>
              Undefined
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