import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router} from 'react-router-dom';
import AnimatedRoutes from './components/Routes';
import Layout from './components/NavBar'
import './css/style.css'
import './css/mNav.css'


function App() {
  return (
    <div className="App">
    <Router>
      <Layout/>
      <AnimatedRoutes/>
    </Router>
    </div>
  );
}

export default App;
