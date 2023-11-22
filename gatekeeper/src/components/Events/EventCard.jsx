import { Link, useNavigate } from "react-router-dom";
import * as TbIcons from "react-icons/tb";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const navigateToSingleEvent = (singleEventPk) => {
    navigate(`/singleevent/${singleEventPk}`);
  };

  return (
    <div className="container EventContainer" key={event.pk}>
      <div className="row">
        <div className="col EventTitle">{event.EventTitle}</div>
      </div>
      <div className="row">
        <div className="col">Organized by: {event.EventOrganizer}</div>
      </div>
      <div className="row">
        <div className="col">
          <TbIcons.TbCalendarEvent />
          {event.EventDate}
        </div>
        <div className="col">
          <TbIcons.TbLocation />
          {event.EventLocation}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TbIcons.TbFileInfo
            className="EventInfoButton"
            onClick={() => navigateToSingleEvent(event.pk)}
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
