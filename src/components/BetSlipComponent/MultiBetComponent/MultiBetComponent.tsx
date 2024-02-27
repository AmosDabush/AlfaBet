import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { BetSelection } from "../../../types/contextTypes";
import "./MultiBetComponent.css";

interface MultiBetProps {
  eventSelections: BetSelection[];
  handleRemoveSelection: (optionId: string) => void;
  handleDecrease: () => void;
  handleIncrease: () => void;
  handleMultiStakeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  stake: number;
}

const MultiBetComponent: React.FC<MultiBetProps> = ({
  eventSelections,
  handleRemoveSelection,
  handleDecrease,
  handleIncrease,
  handleMultiStakeChange,
  stake,
}) => {
  if (eventSelections.length <= 1) {
    return null;
  }

  const totalOdds = eventSelections.reduce(
    (total, selection) => total * selection.odds,
    1,
  );

  return (
    <div
      className="multiBetContainer"
      style={{ justifyContent: "space-between" }}
    >
      <div className="multiBetHeader smallerText">
        <button className="ctaButton">CREATE YOUR BET</button>
      </div>
      <span className="selectionCount">
        <div className="cta-button">CYB</div> &nbsp; {eventSelections.length}{" "}
        SELECTIONS
        <span className="totalOdds"> Odds: {totalOdds.toFixed(2)}</span>
      </span>
      <ul className="timeline">
        {eventSelections.map((selection, sIndex) => (
          <li key={sIndex} className="timeline-item">
            <div className="timeline-icon-wrapper">
              <div className="timeline-icon">-</div>
            </div>
            <div className="timeline-content">
              <div className="betDetails">
                <div className="betMatch">{selection.name}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <IconButton
        style={{ float: "right", marginTop: "-25px", marginRight: "10px" }}
        className="removeAllButton"
        onClick={() =>
          eventSelections.forEach((selection) =>
            handleRemoveSelection(selection.optionId),
          )
        }
      >
        <DeleteIcon />
      </IconButton>
      <div className="input-group">
        <button className="input-group-btn" onClick={handleDecrease}>
          -
        </button>
        <span className="dollarSymbol">$</span>
        <input
          type="text"
          className="form-control"
          value={stake}
          onChange={(e) => handleMultiStakeChange(e)}
        />
        <button className="input-group-btn" onClick={handleIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

export default MultiBetComponent;
