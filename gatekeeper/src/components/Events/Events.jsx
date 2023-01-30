import "./../../css/Events/Events.css";
import "bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosinstance from "../../api/axiosApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as TbIcons from "react-icons/tb";
import MyEvents from "./MyEvents";

function Events() {
  const [event, setevent] = useState([]);
  const [myEventsOnly, setMyEventsOnly] = useState(false);
  const navigate = useNavigate();
  const navigateToSingleEvent = (singleventpk) => {
    localStorage.setItem("singleventpk", singleventpk);
    navigate("/singleeventview");
  };
  const convertDate = (unconvertedDate) => {
    const date = new Date(unconvertedDate);
    const dateEU = date.toLocaleDateString("en-GB");
    return dateEU;
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
      <div className="container-fluid">
        <div className="row">
          {myEventsOnly ? (
            <div className="col EventBanner"> My Events</div>
          ) : (
            <div className="col EventBanner">Events</div>
          )}
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
        </div>
        {myEventsOnly ? (
          <MyEvents events={event} />
        ) : (
          <div>
            <motion.div
              initial={{ y: 500, scale: 1 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {event.map((event, index) => {
                return (
                  <div>
                    {event.EventIsPrivate ? null : (
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
                            {convertDate(event.EventDate)}
                          </div>
                          <div className="col" align="center">
                            <TbIcons.TbLocation className="EventIcon" />
                            {event.EventLocation}
                          </div>
                        </div>
                        <div className="col">
                          <TbIcons.TbInfoSquare
                            className="EventInfoButton"
                            onClick={() => navigateToSingleEvent(event.pk)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </div>
        )}
      </div>
      <div className="heightmaker"></div>
      {myEventsOnly ? (
        <TbIcons.TbArrowBackUp
          className="BackButton"
          onClick={() => setMyEventsOnly(false)}
        />
      ) : (
        <TbIcons.TbListDetails
          className="EventButton"
          onClick={() => setMyEventsOnly(true)}
        />
      )}

      <Link to="/eventcreate">
        <TbIcons.TbPlus className="EventButton2" />
      </Link>
    </>
  );
}

export default Events;
