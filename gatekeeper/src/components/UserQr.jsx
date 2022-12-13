import './../css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import {motion} from "framer-motion";



function UserQr() {
    return (
    <motion.div
        initial={{ opacity: 0, scale: 0.5}}
        animate={{ opacity: 1, scale: 1}}
        transition={{ duration: 1 }}
      >
    </motion.div>
    );
}

export default UserQr;