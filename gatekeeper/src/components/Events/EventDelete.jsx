import React from 'react'
import axiosInstance from '../../api/axiosApi'
import { motion } from 'framer-motion'
function EventDelete(event) {
  const deleteEvent = async () => {
    await axiosInstance
      .post('/api/eventdeleteapi', {eventpk: event.eventdata.pk})
      .then(function (response) {
        console.log(response)
      })
  }
  return (
    <>
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
    <div className='EventContainer'>
      <div>Are you sure u want to delete?</div>
      {event.eventdata.EventTitle}<br/>
      <button className='btn btn-primary' onClick={() => deleteEvent()}>YES</button>
    </div>
    </motion.div>
    </>
  )
}

export default EventDelete