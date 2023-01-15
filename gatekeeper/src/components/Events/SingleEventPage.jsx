import "./../../css/SingleEvent.css";
import "bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosinstance from "../../api/axiosApi";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import * as TbIcons from "react-icons/tb";
import EventEdit from "./EventEdit";
import EventInvite from "./EventInvite";
import EventDelete from "./EventDelete";

function SingleEvent() {
  const [currentInvitedUsers, setcurrentInvitedUsers] = useState([{}]);
  const csrftoken = useCookies(["csrftoken"]);
  const [event, setevent] = useState([]);
  const [eventowner, seteventowner] = useState(false);
  const [editmode, seteditmode] = useState("false");
  const pk = localStorage.getItem("singleventpk");

  const getSingleEvent = async () => {
    await axiosinstance
      .get(`/api/viewsingleevent?pk=${pk}`, {
        headers: { "X-CSRFToken": csrftoken[0].csrftoken },
      })
      .then(function (response) {
        console.log("response:", response.data);
        setevent(response.data[0]);
        localStorage.setItem("singleevent", JSON.stringify(response.data[0]));
        console.log(response.data.EventOwner);
        console.log(localStorage.getItem("userpk"));
        if (response.data[0].EventOwner == localStorage.getItem("userpk")) {
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
        {editmode === "false" ? (
          <div className="container-fluid">
            <div className="row">
              <div className="col SingleEventBanner">SingleEvent</div>
            </div>
            <div className="row SingleEventContainer">
              <div className="col SingleEventTitle">{event.EventTitle}</div>
              <div className="row">
                <div className="col">
                  Organized by:
                  <br />
                  {event.EventOrganizer}
                  <br />
                  <TbIcons.TbCalendarEvent className="EventIcon" />
                  {event.EventDate}
                  <br />
                  <TbIcons.TbLocation className="EventIcon" />
                  {event.EventLocation}
                  <br />
                  Private:
                  {event.EventIsPrivate === false ? (
                    <TbIcons.TbCircleX className="EventIcon" />
                  ) : (
                    <TbIcons.TbCheck className="EventIcon" />
                  )}
                  <br />
                  Free:
                  {event.EventPrice > 0 ? (
                    <TbIcons.TbCircleX className="EventIcon"/>
                  ) : (
                    <TbIcons.TbCheck className="EventIcon"/>
                  )}
                  {event.EventIsFree}
                  <br />
                  Max Capacity:
                  {event.EventCurrentGuests}/{event.EventMaxGuests}
                  <br />
                  {event.EventMinimumAge === 0 ? null : (
                    <div>Minimum Age:{event.EventMinimumAge}</div>
                  )}
                  <br />
                  ${event.EventPrice}
                </div>
                <div className="col">
                <TbIcons.TbInfoCircle className="EventIcon" />
                  <br />
                  {event.EventDescription}
                </div>
              </div>
            </div>
            {eventowner ? (
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <TbIcons.TbTrash
                      onClick={() => seteditmode("delete")}
                      className="EventDeleteButton"
                    />
                  </div>
                  <div className="col">
                    <TbIcons.TbEdit
                      onClick={() => seteditmode("edit")}
                      className="EventEditButton"
                    />
                  </div>
                  <div className="col">
                    <TbIcons.TbAddressBook
                      onClick={() => seteditmode("invite")}
                      className="EventInviteButton"
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>
            {editmode === "edit" ? <EventEdit eventdata={event} /> : null}
            {editmode === "invite" ? <EventInvite eventdata={event} /> : null}
            {editmode === "delete" ? <EventDelete eventdata={event} /> : null}
          </div>
        )}
      </motion.div>
      {editmode === "false" ? (
        <Link to="/events">
          <TbIcons.TbArrowBackUp className="BackButton" />
        </Link>
      ) : (
        <TbIcons.TbArrowBackUp
          className="BackButton"
          onClick={function() {seteditmode("false"); getSingleEvent();}}
        />
      )}
    </>
  );
}

export default SingleEvent;
