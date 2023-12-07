import { useNavigate } from "react-router-dom";
import * as TbIcons from "react-icons/tb";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const navigateToSingleEvent = (singleEventPk) => {
    navigate(`/singleevent/${singleEventPk}`);
  };

  const mediaURL =
    process.env.NODE_ENV === "production"
      ? "https://guidoerdtsieck.nl"
      : "http://localhost:8000";

  return (
    <div className="col">
      <div className="card h-80 w-80 mb-5 flex-grow-0 EventContainer">
        {event.EventBannerURL === null ? null : (
          <img
            className="card-img-top img-fluid"
            src={mediaURL + event.EventBannerURL}
          ></img>
        )}
        <div className="card-body d-flex flex-column event_body">
          <h5 className="card-title">{event.EventTitle}</h5>
          <p className="card-text">{event.EventDescription}</p>
          <ul className="list-group">
            <li className="list-group-item text-white bg-dark">
              {event.EventDate}
            </li>
            <li className="list-group-item text-white bg-dark">
              {event.EventLocation}
            </li>
          </ul>
          <div className="col">
            <TbIcons.TbFileInfo
              className="EventInfoButton"
              onClick={() => navigateToSingleEvent(event.pk)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
