import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { BetSelection } from "../../../types/contextTypes";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./MultiBetComponent.css";

interface MultiBetProps {
  eventSelections: BetSelection[];
  handleRemoveSelection: (optionId: string) => void;
  handleDecrease: () => void;
  handleIncrease: () => void;
  handleMultiStakeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  stake: number;
  error: string;
  setError: (error: string) => void;
}

const MultiBetComponent: React.FC<MultiBetProps> = ({
  eventSelections,
  handleRemoveSelection,
  handleDecrease,
  handleIncrease,
  handleMultiStakeChange,
  stake,
  error,
  setError,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [multiSelection, setMultiSelection] =
    useState<BetSelection[]>(eventSelections);
  if (eventSelections.length < 1) {
    return null;
  }

  useEffect(() => {
    if (stake < 1) {
      setError("please set stake greater than 0");
    }
    if (eventSelections.length < 2) {
      setError("please select at least two selection");
    }

    if (stake > 0 && eventSelections.length >= 2) {
      setError("");
    }

    // Here, I'll also check for incorrect options if I receive proper data.
    // I didn't consider this scenario while creating the mock data, and it was too late to fix it.
  }, [stake, eventSelections]);
  const totalOdds = eventSelections.reduce(
    (total, selection) => total * selection.odds,
    1,
  );

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`multiBetContainer ${collapsed ? "collapsed" : ""}`}>
      <div className="multiBetHeader smallerText" onClick={toggleCollapse}>
        <span className={`arrow ${collapsed ? "collapse" : ""}`}>
          <ArrowForwardIosIcon sx={{ width: "18px" }} />
        </span>
        <button className="ctaButton">CREATE YOUR BET</button>
      </div>
      {!collapsed && (
        <>
          <span className="selectionCount">
            <div className="cta-button">CYB</div> &nbsp;{" "}
            {eventSelections.length} SELECTIONS
            <span className="totalOdds"> Odds: {totalOdds.toFixed(2)}</span>
          </span>
          <ul className="timeline">
            {eventSelections.map((selection, sIndex) => (
              <li key={sIndex} className="timeline-item">
                <div className="timeline-icon-wrapper">
                  <div
                    className="timeline-icon"
                    onClick={() => handleRemoveSelection(selection.optionId)}
                  >
                    -
                  </div>
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
              min="0"
              type="text"
              className="form-control"
              value={stake > 0 ? stake : 0}
              onChange={(e) => handleMultiStakeChange(e)}
            />
            <button className="input-group-btn" onClick={handleIncrease}>
              +
            </button>
          </div>
          <h5 style={{ color: "red" }} className="error">
            {error}
          </h5>
        </>
      )}
    </div>
  );
};

export default MultiBetComponent;
