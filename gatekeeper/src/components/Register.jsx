import './../css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import './../css/register.css'
import { useState } from 'react';
import axios from 'axios';


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
          <>
                <div className="row">
                <div className="col crewbanner">
                  <h1>Register</h1>
                </div>
                </div>
                  <div className="row">
                    <div className="col myForm">
                      <form onSubmit={handleSubmit}>
                          <div className="form-group text-light">
                              <label htmlFor="emailadres1">Email address</label>
                              <input type="email" className="form-control" name='email' aria-describedby="email" placeholder="Enter email"
                              onChange={handleChange} value={RegisterInfo.email}
                              />
                          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                          </div>
                          <div className="form-group">
                              <label htmlFor="nameInput">Name</label>
                              <input type="text" name="name" className="form-control" placeholder="Name"
                              onChange={handleChange} value={RegisterInfo.name}
                              />
                          </div>
                          <div className="form-group">
                              <label htmlFor="exampleFormControlTextarea1">Message</label>
                              <textarea className="form-control" placeholder='I would like to know.....' name="message" rows="3" 
                              onChange={handleChange} value={RegisterInfo.message}
                              ></textarea>
                          </div>
                          <div>
                            <button className='btn btn-primary'>Submit</button> 
                          </div>
                      </form>
                  </div>
                </div>
                  </>
          );
      }
   
  export default Register ;