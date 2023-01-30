import React from "react";
import axiosInstance from "../../api/axiosApi";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

//© 2023 Mike Vermeer & Guido Erdtsieck. All rights reserved.

function EventDelete(event) {
  const navigate = useNavigate();
  console.log(event.eventdata.pk);
  const csrftoken = useCookies(["csrftoken"]);
  const deleteEvent = async () => {
    await axiosInstance
      .post(
        "/api/eventdeleteapi",
        { eventpk: event.eventdata.pk },
        { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
      )
      .then(function (response) {
        console.log(response);
      });
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="EventContainer">
          <div>Are you sure u want to delete?</div>
          {event.eventdata.EventTitle}
          <br />
          <button
            className="btn btn-primary"
            onClick={function () {
              deleteEvent();
              navigate("/event");
            }}
          >
            YES
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default EventDelete;
