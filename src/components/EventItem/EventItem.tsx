// EventItem.tsx
import React, { useState } from "react";
import MarketItem from "../MarketItem/MarketItem";
import { Event, BetSelection } from "../../types/contextTypes"; // Import your types
import "./EventItem.css";

interface EventItemProps {
  event: Event;
  selections: BetSelection[];
  handleAddSelection: (selection: BetSelection) => void;
}

const EventItem: React.FC<EventItemProps> = ({
  event,
  selections,
  handleAddSelection,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to control the collapsed sections

  const toggleCollapse = () => setIsCollapsed(!isCollapsed); // Function to toggle the collapse

  return (
    <div className="event-item">
      <h2 onClick={toggleCollapse} style={{ cursor: "pointer" }}>
        <span className={`collapse-indicator ${isCollapsed ? 'collapsed' : ''}`}>&#x25B6;</span>
        {event.eventName}
      </h2>
      {isCollapsed ? null : ( // Render the content conditionally based on isCollapsed state
        <div>
          {event.markets.map((market) => (
            <MarketItem
              key={market.marketId}
              market={market}
              selections={selections}
              handleAddSelection={handleAddSelection}
              eventName={event.eventName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventItem;
