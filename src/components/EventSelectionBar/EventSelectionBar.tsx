import React, { useState, useEffect, useRef } from "react";
import { Button, Tooltip } from "@mui/material";
import { Event } from "../../types/contextTypes"; // Import your Event type
import "./EventSelectionBar.css"; // Import your CSS file

interface EventSelectionBarProps {
  selectedSport: string;
  selectedEvent: string;
  eventsData: { [key: string]: Event[] };
  onSelectEvent: (eventId: string) => void;
}

const EventSelectionBar: React.FC<EventSelectionBarProps> = ({
  selectedSport,
  selectedEvent,
  eventsData,
  onSelectEvent,
}) => {
  const eventsToShow =
    selectedSport === "All"
      ? Object.values(eventsData).flat()
      : eventsData[selectedSport];

  const [currentIndex, setCurrentIndex] = useState(0);
  const eventButtonContainerRef = useRef<HTMLDivElement>(null);

  const rotateEvents = (direction: "left" | "right") => {
    setCurrentIndex((prevIndex) => {
      const lastIndex = eventsToShow.length - 1;
      let nextIndex;
      if (direction === "left") {
        if (selectedEvent === "All") {
          nextIndex = lastIndex;
        } else nextIndex = prevIndex === 0 ? lastIndex : prevIndex - 1;
      } else {
        nextIndex = prevIndex === lastIndex ? -1 : prevIndex + 1;
      }
      onSelectEvent(nextIndex < 0 ? "All" : eventsToShow[nextIndex].eventId);
      return nextIndex;
    });
  };

  useEffect(() => {
    // Scroll to the selected event position when it changes
    if (eventButtonContainerRef.current) {
      const selectedItem = eventButtonContainerRef.current.querySelector(
        `.eventButton[data-event="${selectedEvent}"]`,
      );
      if (selectedItem instanceof HTMLElement) {
        eventButtonContainerRef.current.scrollLeft =
          selectedItem.offsetLeft -
          eventButtonContainerRef.current.offsetWidth / 2 +
          selectedItem.offsetWidth / 2;
      }
      if (selectedEvent === "All") {
        eventButtonContainerRef.current.scrollLeft = 0;
      }
    }
  }, [selectedEvent]);

  return (
    <div className="eventSelectionContainer">
      <div className="eventButtonContainer" ref={eventButtonContainerRef}>
        <Tooltip title="All Events">
          <button
            className={`eventButton ${selectedEvent === "All" ? "selectedEvent" : ""}`}
            onClick={() => onSelectEvent("All")}
          >
            All Events
          </button>
        </Tooltip>
        {eventsToShow.map((event, index) => (
          <Tooltip key={event.eventId ?? -1} title={event.eventName}>
            <button
              className={`eventButton ${selectedEvent === event.eventId ? "selectedEvent" : ""} ${
                index === currentIndex ? "currentEvent" : ""
              }`}
              onClick={() => onSelectEvent(event.eventId)}
              data-event={event.eventId}
            >
              {event.eventName.length > 10
                ? `${event.eventName.slice(0, 10)}...`
                : event.eventName}
            </button>
          </Tooltip>
        ))}
      </div>
      <div className="arrowBtn left" onClick={() => rotateEvents("left")}>
        &lt;
      </div>
      <div className="arrowBtn right" onClick={() => rotateEvents("right")}>
        &gt;
      </div>
    </div>
  );
};

export default EventSelectionBar;
