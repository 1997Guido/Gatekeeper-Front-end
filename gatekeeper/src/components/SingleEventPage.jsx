import "./../css/SingleEvent.css";
import "bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosinstance from "../api/axiosApi";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import * as TbIcons from "react-icons/tb";
import EventEdit from "./EventEdit";
function SingleEvent() {
  const csrftoken = useCookies(["csrftoken"]);
  const events = JSON.parse(localStorage.getItem("events"));
  console.log(events);
  const singleevent = events[localStorage.getItem("eventnumber")];
  const [event, setevent] = useState([]);
  const [eventowner, seteventowner] = useState(false);
  const [editmode, seteditmode] = useState(false);
  const pk = singleevent.pk;

  const getSingleEvent = async () => {
    await axiosinstance
      .post(
        "/api/singleeventapi",
        { pk },
        { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
      )
      .then(function (response) {
        console.log(response.data);
        setevent(response.data);
        localStorage.setItem("singleevent", JSON.stringify(response.data));
        console.log(response.data.EventOwner);
        console.log(localStorage.getItem("userpk"));
        if (response.data.EventOwner == localStorage.getItem("userpk")) {
          seteventowner(true);
        }
      });
  };

  useEffect(() => {
    getSingleEvent();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {editmode ? (
          <EventEdit eventdata={event} />
        ) : (
          <div className="container-fluid">
            <div className="row">
              <div className="col SingleEventBanner">SingleEvent</div>
            </div>
            <div className="row SingleEventContainer">
              <div className="col SingleEventTitle">{event.EventTitle}</div>
              <div className="">
                <div className="col">
                  Organized by:
                  <br />
                  {event.EventOrganizer}
                  <br />
                  Date:
                  {event.EventDate}
                  <br />
                  Location:
                  {event.EventLocation}
                  <br />
                  Description:
                  {event.EventDescription}
                  <br />
                  Invited Guests:
                  {event.EventInvitedGuests}
                  <br />
                  Private:
                  {event.EventIsPrivate}
                  <br />
                  Free:
                  {event.EventIsFree}
                  <br />
                  Event Max Capacity:
                  {event.EventMaxGuests}
                  <br />
                  Event Price:
                  {event.EventPrice}
                  <br />
                  Guests currently at event:
                  {event.EventCurrentGuests}
                  <br />
                  Minimum Age:
                  {event.EventMinimumAge}
                  <br />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                {eventowner ? (
                  <TbIcons.TbEdit
                    onClick={() => seteditmode(true)}
                    className="EventInfoButton"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
      <Link to="/events">
        <TbIcons.TbArrowBackUp className="BackButton" />
      </Link>
    </>
  );
}

export default SingleEvent;
