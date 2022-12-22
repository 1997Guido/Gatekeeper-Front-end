import './../css/Events.css'
import 'bootstrap/dist/css/bootstrap.css';
import {motion} from "framer-motion";
import { useEffect, useState } from 'react';
import axiosinstance from '../api/axiosApi';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import SingleEvent from './SingleEventPage';
import { useNavigate } from 'react-router-dom';
function Events() {
    const navigate = useNavigate();
    const navigateToSingleEvent = (eventnumber) => {
        localStorage.setItem('eventnumber', eventnumber);
        navigate('/singleeventview',{eventnumber});
    }
    const [event, setevent] = useState([]);
    const [singleview, setsingleview] = useState(false);

    const getEvents = () => {
        axiosinstance.get('/api/eventviewapi?format=json')
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
        <div className="container-fluid">
        <div className="row">
            <div className="col EventBanner">
                Events
            </div>
        </div>
        <div className="row">
          <div className="col"></div>
              <Link to='/eventcreate'><button className='btn btn-primary EventButton'>Create Event</button></Link>
              <div className="col">
              <Link to='/myevents'><button className='btn btn-primary EventButton'>My events</button></Link>
              </div>
        </div>
        {event.map((event, index) => (
        <div className="row EventContainer" key={index}>
            <div className="col EventTitle">
                {event.EventTitle}
                <button onClick={() => navigateToSingleEvent(index)}>View</button>
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
    </div>

        </>
     );
}

export default Events;