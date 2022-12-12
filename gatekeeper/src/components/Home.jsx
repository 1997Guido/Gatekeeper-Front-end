import './../css/style.css'
import './../css/home.css'
import 'bootstrap/dist/css/bootstrap.css';
import {motion} from "framer-motion";
import { useState, useEffect } from 'react';
import validateUserLoggedIn from '../api/ValidateUserLoggedIn';


function Home() {
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
    
    return (
<motion.div
    initial={{ opacity: 0, scale: 0.5}}
    animate={{ opacity: 1, scale: 1}}
    transition={{ duration: 1 }}
> 
    <div className="container">
        <div className="row">
            <div className="col"></div>
            <div className="col home">
                <h1>Home</h1>
            </div>
            <div className="col"></div>
        </div>
    </div>
</motion.div>
     );
}

export default Home;