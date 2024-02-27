import React, { useState } from "react";
import { Market, BetSelection } from "../../types/contextTypes";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./MarketItem.css"; // Assuming you saved the CSS in MarketItem.css

interface MarketItemProps {
  market: Market;
  selections: BetSelection[];
  handleAddSelection: (selection: BetSelection) => void;
  eventName: string;
}

const MarketItem: React.FC<MarketItemProps> = ({
  market,
  selections,
  handleAddSelection,
  eventName,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="market-item-container">
      <h3 onClick={toggleCollapse} className="market-item-title">
        <span className={`arrow ${isCollapsed ? "collapse" : ""}`}>
          <ArrowForwardIosIcon sx={{ width: "18px" }} />
        </span>
        <span className="market-title"> {market.title}</span>
      </h3>
      {!isCollapsed && (
        <div key={market.marketId} className="market-options-container">
          {market.options.map((option) => (
            <button
              key={option.optionId}
              onClick={() =>
                handleAddSelection({
                  marketId: market.marketId,
                  optionId: option.optionId,
                  odds: option.odds,
                  name: `${option.name} | ${eventName} - ${market.title}`,
                  eventId: option.eventId?.toString() ?? "-1",
                })
              }
              className={`bet-option-button ${
                selections.some(
                  (selection) =>
                    selection.optionId === option.optionId &&
                    selection.marketId === market.marketId,
                )
                  ? "selected"
                  : ""
              }`}
            >
              <span>{option.name}</span> @ {option.odds}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketItem;
