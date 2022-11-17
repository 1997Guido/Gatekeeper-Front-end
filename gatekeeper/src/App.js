import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import AnimatedRoutes from './components/AnimatedRoutes';
import NavBar from './components/NavBar'

function App() {
  return (
    <>
    <Router>
      <NavBar/>
      <AnimatedRoutes/>
    </Router>
    </>
  );
}

export default App;
