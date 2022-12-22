import './../css/MyEvents.css'
import 'bootstrap/dist/css/bootstrap.css';
import {motion} from "framer-motion";
import { useEffect, useState } from 'react';
import axiosinstance from '../api/axiosApi';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';


function MyEvents() {       
    const [event, setevent] = useState([]);
  useEffect(() => {
    axiosinstance.get('/api/eventviewapipersonal')
    .then(function(response){
      setevent(response.data);
      console.log(response.data)
    })
  }, [])
    return ( 
        <>
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
        </div>
        ))}
        <Link to='/events'><button className='btn btn-primary MyEventsButton'>Back</button></Link>

        </>
     );
}

export default MyEvents;