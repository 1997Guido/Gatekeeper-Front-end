import './../css/SingleEvent.css'
import 'bootstrap/dist/css/bootstrap.css';
import {motion} from "framer-motion";
import { useEffect, useState } from 'react';
import axiosinstance from '../api/axiosApi';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';


function SingleEvent() {  
    const csrftoken = useCookies(['csrftoken'])      
    const events = JSON.parse(localStorage.getItem('events'));
    const singleevent = events[localStorage.getItem('eventnumber')];
    const [event, setevent] = useState([]);
    const pk = singleevent.pk;

    const getSingleEvent = () => {
      axiosinstance.post('/api/singleeventapi', {pk},
      {headers: {'X-CSRFToken': csrftoken[0].csrftoken}})
        .then(function(response){
          console.log(response);
          setevent(response.data);
        })
  }
  useEffect(() => {
      getSingleEvent();
  }, []);
    return ( 
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col SingleEventBanner">
                    SingleEvent
                </div>
            </div>
            <div className="row SingleEventContainer">
                <div className="col SingleEventTitle">
                    {event.EventTitle}
                </div>
                <div className="">
                  <div className="col">
                    Organized by:<br/>
                    {event.EventOrganizer}<br/>
                    Date:
                    {event.EventDate}<br />
                    Location:
                    {event.EventLocation}<br />
                    Description:
                    {event.EventDescription}<br />
                    Invited Guests:
                    {event.EventInvitedGuests}<br />
                    Private:
                    {event.EventIsPrivate}<br />
                    Free:
                    {event.EventIsFree}<br />
                    Event Max Capacity:
                    {event.EventMaxGuests}<br />
                    Event Price:
                    {event.EventPrice}<br />
                    Guests currently at event:
                    {event.EventCurrentGuests}<br />
                    Minimum Age:
                    {event.EventMinimumAge}<br />
                  </div>
                </div>
            </div>
              <div className="row">
                <div className="col">
              </div>
            </div>
        </div>
        <Link to='/events'><button className='btn btn-primary SingleEventButton'>Back</button></Link>

        </>
     );
}

export default SingleEvent;