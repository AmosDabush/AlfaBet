import React from "react";
import { Event, BetSelection } from "../../types/contextTypes"; // Import your types
import EventItem from "../EventItem/EventItem";

interface EventsDisplayProps {
  eventsData: { [key: string]: Event[] };
  selectedSport: string;
  selectedEvent: string;
  selections: BetSelection[];
  handleAddSelection: (selection: BetSelection) => void;
}

const EventsDisplay: React.FC<EventsDisplayProps> = ({
  eventsData,
  selectedSport,
  selectedEvent,
  selections,
  handleAddSelection,
}) => {
  const renderEvents = () => {
    const eventsToShow =
      selectedSport === "All"
        ? Object.values(eventsData).flat()
        : eventsData[selectedSport];

    return eventsToShow
      .filter((event) =>
        selectedEvent === "All" ? true : event.eventId === selectedEvent,
      )
      .map((event) => (
        <EventItem
          key={event.eventId || -1}
          event={event}
          selections={selections}
          handleAddSelection={handleAddSelection}
        />
      ));
  };

  return <>{renderEvents()}</>;
};

export default EventsDisplay;
