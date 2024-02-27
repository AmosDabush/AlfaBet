import React, { useState } from "react";
import MarketItem from "../MarketItem/MarketItem";
import { Event, BetSelection } from "../../types/contextTypes";
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="event-item">
      <h2 onClick={toggleCollapse} style={{ cursor: "pointer" }}>
        <span
          className={`collapse-indicator ${isCollapsed ? "collapsed" : ""}`}
        >
          &#x25B6;
        </span>
        {event.eventName}
      </h2>
      {isCollapsed ? null : (
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
