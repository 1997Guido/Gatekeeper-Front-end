import './../css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './..NavBar'
import HeaderFooter from './HeaderFooter';


function Layout() {
  let [isAuth, setIsAuth] = useState(localStorage.getItem('Auth') === 'true' ? true : false);
  return (
    <>
    <HeaderFooter/>
    </>
   );
}

export default Layout;
