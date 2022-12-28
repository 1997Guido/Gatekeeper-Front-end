import './../css/Events.css'
import 'bootstrap/dist/css/bootstrap.css';
import {motion} from "framer-motion";
import { useEffect, useState } from 'react';
import axiosinstance from '../api/axiosApi';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import SingleEvent from './SingleEventPage';
import { useNavigate } from 'react-router-dom';
import * as TbIcons from "react-icons/tb";




function Events() {
    const navigate = useNavigate();
    const navigateToSingleEvent = (eventnumber) => {
        localStorage.setItem('eventnumber', eventnumber);
        navigate('/singleeventview');
    }
    const [event, setevent] = useState([]);

    const getEvents = async () => {
        await axiosinstance.get('/api/eventviewapi?format=json')
          .then(function(response){
            console.log(response);
            setevent(response.data);
            localStorage.setItem('events', JSON.stringify(response.data));
          })
    }
    useEffect(() => {
        getEvents();
    }, []);
    return (
        <> 
    <motion.div
      initial={{ opacity: 0, scale: 0.7}}
      animate={{ opacity: 1, scale: 1}}
      transition={{ duration: 0.8 }}
    >
        <div className="container-fluid">
        <div className="row">
            <div className="col EventBanner">
                Events
            </div>
        </div>
        <div className="row">
          <div className="col"></div>
              <div className="col">
            </div>
        </div>
        {event.map((event, index) => (
        <div className="row EventContainer" key={index}>
            <div className="col EventTitle">
                {event.EventTitle}
            </div>
            <div className="">
              <div className="col">
                Organized by:<br/>
                {event.EventOrganizer}<br/>
                {event.EventDate}<br />
                {event.EventLocation}<br />
              </div>
            </div>
            <div className="col">
                <TbIcons.TbFileInfo className='EventInfoButton' onClick={() => navigateToSingleEvent(index)}/>
            </div>
        </div>
        ))}
    </div>
    <div className='heightmaker'></div>

        </motion.div>
        <Link to='/myevents'><button className='EventButton'>My events</button></Link>
        <Link to='/eventcreate'><TbIcons.TbPlus className='EventButton2'/></Link>
        </>
     );
}

export default Events;