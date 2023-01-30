import "./../../css/Miscellaneous/GlobalStyle.css";
import "bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import * as TbIcons from "react-icons/tb";
import { useNavigate } from "react-router-dom";
function MyEvents(events) {
  const navigate = useNavigate();
  const navigateToSingleEvent = (singleventpk) => {
    localStorage.setItem("singleventpk", singleventpk);
    navigate("/singleeventview");
  };
  return (
    <>
      <motion.div
        initial={{ y: 500, scale: 1 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {events.events.map((event, index) => (
          <div>
          {event.EventOwner == localStorage.getItem("userpk") ? (
          <div className="EventContainer" key={index}>
            <div className="col EventTitle">{event.EventTitle}</div>
            <div className="row">
              <div className="col">
                Organized by:
                <br />
                {event.EventOrganizer}
              </div>
            </div>
            <div className="row">
              <div className="col" align="center">
                <TbIcons.TbCalendarEvent className="EventIcon" />
                {event.EventDate}
                </div>
                <div className="col" align="center">
                <TbIcons.TbLocation className="EventIcon" />
                {event.EventLocation}
                </div>
            </div>
            <div className="col">
              <TbIcons.TbFileInfo
                className="EventInfoButton"
                onClick={() => navigateToSingleEvent(event.pk)}
              />
            </div>
          </div>
          ) : (null)}
          </div>
        ))}
        <div className="heightmaker"></div>
      </motion.div>
    </>
  );
}

export default MyEvents;
