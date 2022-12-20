import React from 'react'
import axiosInstance from '../api/axiosApi'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCookies } from 'react-cookie'




function CreateEvent() {
    let csrftoken = useCookies(['csrftoken'])
    const [Success, setSucces] = useState(false);
    const [EventInfo, setEventInfo] = useState({
        EventTitle: '',
        EventDescription: '',
        EventDate: '',
        EventTimeStart: '',
        EventTimeEnd: '',
        EventLocation: '',
        EventMaxGuests: '',
        EventInvitedGuests: '',
        EventIsFree: true,
        EventPrice: 0,
        EventDuration: 0,
        EventMinimumAge: 0,
        EventOrganizer: '',
        });
    const handleChange = (event) => {
          setEventInfo({ ...EventInfo, [event.target.name]: event.target.value });
        };
        const handleSubmit = (event) => {
            console.log(EventInfo)
          event.preventDefault()
          axiosInstance.post('api/eventcreationapi',
          {
            EventTitle: EventInfo.EventTitle,
            EventDescription: EventInfo.EventDescription,
            EventDate: EventInfo.EventDate,
            EventTimeStart: EventInfo.EventTimeStart,
            EventTimeEnd: EventInfo.EventTimeEnd,
            EventLocation: EventInfo.EventLocation,
            EventMaxGuests: EventInfo.EventMaxGuests,
            EventInvitedGuests: EventInfo.EventInvitedGuests,
            EventIsFree: EventInfo.EventIsFree,
            EventPrice: EventInfo.EventPrice,
            EventDuration: EventInfo.EventDuration,
            EventMinimumAge: EventInfo.EventMinimumAge,
            EventOrganizer: EventInfo.EventOrganizer,
          },
          {headers: {'X-CSRFToken': csrftoken[0].csrftoken}})
          .then(function(response){
            console.log(EventInfo)
                console.log(response);
                setSucces(true);
            });
        };
        return (
        <motion.div
          initial={{ opacity: 0, scale: 0.5}}
          animate={{ opacity: 1, scale: 1}}
          transition={{ duration: 1 }}
        >
        {Success ? (
          <div>Successs</div>
        ) : (
          <div className="container-flex EventContainer">
            <form onClick={handleSubmit} className="myFormEvent">
              <div className="myFormGroupEvent">
                <label htmlFor="EventTitle">EventTitle</label>
                <input type="text" className="form-control" name="EventTitle" placeholder="Enter EventTitle"
                onChange={handleChange} value={EventInfo.EventTitle}/>
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventDescription">EventDescription</label>
                <input type="text" className="form-control" name="EventDescription" placeholder="Enter EventDescription"
                onChange={handleChange} value={EventInfo.EventDescription}/>
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventDate">EventDate</label>
                <input type="text" className="form-control" name="EventDate" placeholder="Enter EventDate"
                onChange={handleChange} value={EventInfo.EventDate}/>
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventLocation">EventLocation</label>
                <input type="text" className="form-control" name="EventLocation" placeholder="Enter EventLocation"
                onChange={handleChange} value={EventInfo.EventLocation}/>
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventMaxGuests">EventMaxGuests</label>
                <input type="text" className="form-control" name="EventMaxGuests" placeholder="Enter EventMaxGuests"
                onChange={handleChange} value={EventInfo.EventMaxGuests}/>
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventInvitedGuests">EventInvitedGuests</label>
                <input type="text" className="form-control" name="EventInvitedGuests" placeholder="Enter EventInvitedGuests"
                onChange={handleChange} value={EventInfo.EventInvitedGuests}/>
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventIsFree">EventIsFree</label>
                <input type="text" className="form-control" name="EventIsFree" placeholder="Enter EventIsFree"
                onChange={handleChange} value={EventInfo.EventIsFree}/>
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventPrice">EventPrice</label>
                <input type="text" className="form-control" name="EventPrice" placeholder="Enter EventPrice"
                onChange={handleChange} value={EventInfo.EventPrice}/>
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventDuration">EventDuration</label>
                <input type="text" className="form-control" name="EventDuration" placeholder="Enter EventDuration"
                onChange={handleChange} value={EventInfo.EventDuration}/>
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventMinimumAge">EventMinimumAge</label>
                <input type="text" className="form-control" name="EventMinimumAge" placeholder="Enter EventMinimumAge"
                onChange={handleChange} value={EventInfo.EventMinimumAge}/>
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventOrganizer">EventOrganizer</label>
                <input type="text" className="form-control" name="EventOrganizer" placeholder="Enter EventOrganizer"
                onChange={handleChange} value={EventInfo.EventOrganizer}/>
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventIsPrivate">EventIsPrivate</label>
                <input type="text" className="form-control" name="EventIsPrivate" placeholder="Enter EventIsPrivate"
                onChange={handleChange} value={EventInfo.EventIsPrivate}/>
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventTimeStart">EventTimeStart</label>
                <input type="text" className="form-control" name="EventTimeStart" placeholder="Enter EventTimeStart"
                onChange={handleChange} value={EventInfo.EventTimeStart}/>
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventTimeEnd">EventTimeEnd</label>
                <input type="text" className="form-control" name="EventTimeEnd" placeholder="Enter EventTimeEnd"
                onChange={handleChange} value={EventInfo.EventTimeEnd}/>
              </div>
    
                <button type="submit" className="btn btn-primary">Create Event</button>
              </form>
          </div>
        )}
    </motion.div>
  )
}

export default CreateEvent