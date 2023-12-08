import "./../../css/Events/SingleEvent.css";
import "bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosinstance from "../../api/axiosApi";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import * as TbIcons from "react-icons/tb";
import EventEdit from "./EventEdit";
import EventInvite from "./EventInvite";
import EventDelete from "./EventDelete";
function SingleEvent() {
  const csrftoken = useCookies(["csrftoken"]);
  const [event, setevent] = useState([]);
  const [eventowner, seteventowner] = useState(false);
  const [editmode, seteditmode] = useState("false");
  const { pk } = useParams();
  const mediaURL = process.env.NODE_ENV === 'production' ? "https://guidoerdtsieck.nl" : "http://localhost:8000"
  const getSingleEvent = async () => {
    await axiosinstance
      .get(`/api/event/${pk}/`, {
        headers: { "X-CSRFToken": csrftoken[0].csrftoken },
      })
      .then(function (response) {
        setevent(response.data);
        if (response.data.EventOwner == localStorage.getItem("userpk")) {
          seteventowner(true);
        }
      }).catch(function (error) {
      });
  };

  useEffect(() => {
    getSingleEvent();
  }, []);

  return (
    <>
      <motion.div
        key={editmode}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        
        {editmode === "false" ? (
          <div className="container-fluid">
            <div className="card SingleEventContainer mt-5">
              {event.EventBanner === null ? null : (
              <img
                class="card-img-top"
                src={mediaURL + event.EventBannerURL}
                alt="Card image cap"
              ></img>
              )}
              <div className="card-body">
                <h5 className="card-title">{event.EventTitle}</h5>
                <p className="card-text">{event.EventDescription}</p>
              </div>
              <div className="row">
                <div className="col">
                  <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                      <TbIcons.TbCalendarEvent /> {event.EventDate}
                    </li>
                    <li className="list-group-item">
                      <TbIcons.TbLocation /> {event.EventLocation}
                    </li>
                    <li className="list-group-item">
                      Capacity: {event.EventCurrentGuests}/
                      {event.EventMaxGuests}
                    </li>
                    <li className="list-group-item">
                      Minimum Age: {event.EventMinimumAge || "No restriction"}
                    </li>
                  </ul>
                </div>
                <div className="col">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Price: ${event.EventPrice}
                    </li>
                    <li className="list-group-item">
                      Private:{" "}
                      {event.EventIsPrivate ? (
                        <TbIcons.TbCheck />
                      ) : (
                        <TbIcons.TbCircleX />
                      )}
                    </li>
                    <li className="list-group-item">
                      Free:{" "}
                      {event.EventPrice > 0 ? (
                        <TbIcons.TbCircleX />
                      ) : (
                        <TbIcons.TbCheck />
                      )}
                    </li>
                  </ul>
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
