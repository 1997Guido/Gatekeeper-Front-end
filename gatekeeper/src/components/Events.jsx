import './../css/Events.css'
import 'bootstrap/dist/css/bootstrap.css';
import {motion} from "framer-motion";
import { useEffect, useState } from 'react';
import axiosinstance from '../api/axiosApi';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

function Events() {
        
    let csrftoken = useCookies(['csrftoken'])
    const [event, setevent] = useState([]);

    const getEvents = () => {
        axiosinstance.get('api/eventviewapi')
          .then(function(response){
            console.log(response);
            setevent(response);
          })
    }
    return ( 
        <>
        <div className="container-fluid EventContainer">
            <div className="row EventTitle">
                <div className="col EventTitle">
                    Events
                </div>
            </div>
            {event.map((events, index) => (
            <div className="row eventbox">
                <div className="col eventtext eventtitel" key={events.id}>
                    {events.name}
                </div>
                <div className="row">
                  <div className="col eventtext">
                    Description: {events.description}<br />
                    Attending: {events.attending_count}<br />
                  </div>
                </div>
            <div className="row">
              <div className="col eventtext">
                  Date: {events.start_time}
              </div>
              <div className="row">
                <div className="col eventtext">
                </div>
              </div>
            </div>
            </div>
            ))}
            <div className="row">
                <div className="col">
                <Link to='/eventcreate'><button className='btn btn-primary'>Create event</button></Link>
                </div>
            </div>
        </div>

        </>
     );
}

export default Events;