import "./../../css/Events/Events.css";
import "bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosinstance from "../../api/axiosApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as TbIcons from "react-icons/tb";

function Events() {
  const [event, setevent] = useState([]);
  const navigate = useNavigate();
  const navigateToSingleEvent = (singleventpk) => {
    localStorage.setItem("singleventpk", singleventpk);
    navigate("/singleeventview");
  };

  const getEvents = async () => {
    await axiosinstance
      .get("/api/eventviewapi?format=json")
      .then(function (response) {
        console.log(response);
        setevent(response.data);
      });
  };
  useEffect(() => {
    getEvents();
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col EventBanner">Events</div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col"></div>
          </div>
          <div>
            {event.map((event, index) => {
              return (
                <div>
                  {event.EventIsPrivate ? null : (
                    <div className="row EventContainer" key={index}>
                      <div className="col EventTitle">{event.EventTitle}</div>
                      <div className="">
                        <div className="col">
                          Organized by:
                          <br />
                          {event.EventOrganizer}
                          <div className="col">
                            <TbIcons.TbCalendarEvent className="EventIcon" />
                            {event.EventDate}
                            <TbIcons.TbLocation className="EventIcon" />
                            {event.EventLocation}
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <TbIcons.TbFileInfo
                          className="EventInfoButton"
                          onClick={() => navigateToSingleEvent(event.pk)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="heightmaker"></div>
      </motion.div>
      <Link to="/myevents">
        <TbIcons.TbListDetails className="EventButton" />
      </Link>
      <Link to="/eventcreate">
        <TbIcons.TbPlus className="EventButton2" />
      </Link>
    </>
  );
}

export default Events;
