import './../css/GlobalStyle.css'
import './../css/home.css'
import 'bootstrap/dist/css/bootstrap.css';
import {motion} from "framer-motion";

function Home() {
    
    return (
      <>
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
</>
     );
}

export default Home;