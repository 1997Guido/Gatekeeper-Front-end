import React from 'react'
import axiosInstance from '../../api/axiosApi'
function EventDelete(event) {
  const deleteEvent = async () => {
    await axiosInstance
      .post('/api/eventdeleteapi', {eventpk: event.eventdata.pk})
      .then(function (response) {
        console.log(response)
      })
  }
  return (
    <div className='EventContainer'>
      <div>Are you sure u want to delete?</div>
      {event.eventdata.EventTitle}<br/>
      <button className='btn btn-primary' onClick={() => deleteEvent()}>YES</button>
    </div>
  )
}

export default EventDelete