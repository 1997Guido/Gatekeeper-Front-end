import { BrowserRouter as Router, useLocation} from 'react-router-dom';
import RouterGate from './components/RouterGate';
import './css/Miscellaneous/style.css'
import './css//Miscellaneous/mNav.css'
import HeaderFooter from "./components/Other/HeaderFooter.jsx";
import Footer from "./components/Other/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div className="App">
    <Router>
      <HeaderFooter/>
      <RouterGate/>  
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
