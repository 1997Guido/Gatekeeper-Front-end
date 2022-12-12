import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router} from 'react-router-dom';
import RouterGate from './components/RouterGate';
import Layout from './components/NavBar'
import './css/style.css'
import './css/mNav.css'


function App() {
  return (
    <div className="App">
    <Router>
      <Layout/>
      <RouterGate/>
    </Router>
    </div>
  );
}

export default App;
