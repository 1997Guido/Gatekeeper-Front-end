import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, useLocation} from 'react-router-dom';
import RouterGate from './components/RouterGate';
import './css/style.css'
import './css/mNav.css'
import HeaderFooter from "./components/HeaderFooter";
import { useEffect, useState } from "react";
import Nav from "./components/NavBar";
import validateUserLoggedIn from "./api/ValidateUserLoggedIn";



function App() {
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
    <div className="App">
    <Router>
      <HeaderFooter/>
      <RouterGate/>      
    </Router>
    </div>
  );
}

export default App;
