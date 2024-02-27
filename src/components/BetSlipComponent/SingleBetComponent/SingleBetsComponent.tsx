import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./SingleBetsComponent.css";
interface BetSelection {
  optionId: string;
  name: string;
  odds: number;
  stake?: number;
}

interface SingleBetProps {
  selection: BetSelection;
  index: number;
  handleRemoveSelection: (optionId: string) => void;
  handleDecreaseS: (optionId: string) => void;
  handleIncreaseS: (optionId: string) => void;
  handleStakeChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    optionId: string,
  ) => void;
}

const SingleBetComponent: React.FC<SingleBetProps> = ({
  selection,
  index,
  handleRemoveSelection,
  handleDecreaseS,
  handleIncreaseS,
  handleStakeChange,
}) => {
  return (
    <div className="singleBet" key={index}>
      <div className="singleTitle">{selection.name}</div>
      <IconButton
        style={{
          right: "20px",
          position: "absolute",
          marginTop: "-20px",
          marginRight: "-6px",
        }}
        className="removeAllButton"
        onClick={() => handleRemoveSelection(selection.optionId)}
      >
        <DeleteIcon />
      </IconButton>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="input-group">
          <button
            className="input-group-btn"
            onClick={() => handleDecreaseS(selection.optionId)}
          >
            -
          </button>
          <span className="dollarSymbol">$</span>
          <input
            type="text"
            className="form-control"
            value={selection.stake ?? "0"}
            onChange={(e) => handleStakeChange(e, selection.optionId)}
          />
          <button
            className="input-group-btn"
            onClick={() => handleIncreaseS(selection.optionId)}
          >
            +
          </button>
        </div>
        <span
          style={{ margin: "15px 8px 8px 8px", marginTop: "10px" , fontWeight: "bolder"}}
        >{`+${selection.odds}`}</span>
      </div>
    </div>
  );
};

export default SingleBetComponent;
