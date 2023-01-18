import "./../css/GlobalStyle.css";
import "./../css/HeaderFooter.css";
import "bootstrap/dist/css/bootstrap.css";

function Footer() {
    return ( 
        <div>
        <footer>
          <div className="footer-container">
            <div className="footer-content">
              <p>Copyright &copy; {new Date().getFullYear()} Guido and Mike</p>
              <div className="footer-links">
              </div>
            </div>
          </div>
        </footer>
      </div>
     );
}

export default Footer;