import React from "react";
import { useBetSlip } from "../../contexts/BetSlipContext";
import { BetSelection } from "../../types/contextTypes";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import FooterComponent from "../FooterComponent/FooterComponent";
import "./BetSlipComponent.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const BetSlipComponent = ({
  open,
  onClose,
  handleToggle,
}: {
  open: boolean;
  onClose: () => void;
  handleToggle: () => void;
}) => {
  const {
    selections,
    removeSelection,
    setTotalStake,
    updateSelection,
    multiSelection,
    updateMultiSelection,
  } = useBetSlip();

  const handleRemoveSelection = (optionId: string) => {
    removeSelection(optionId);
  };

  const handleStakeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    optionId: string,
  ) => {
    const stakeValue = parseFloat(event.target.value);
    if (!isNaN(stakeValue) && stakeValue >= 0) {
      const updatedSelection = selections.find(
        (selection) => selection.optionId === optionId,
      );
      if (updatedSelection) {
        updatedSelection.stake = stakeValue;
        updateSelection(updatedSelection);
        const totalStake = selections.reduce(
          (total, selection) => total + (selection.stake ?? 0),
          0,
        );
        setTotalStake(totalStake);
      }
    }
  };

  const handleIncreaseS = (optionId: string) => {
    const updatedSelection = selections.find(
      (selection) => selection.optionId === optionId,
    );
    if (updatedSelection?.stake) {
      updatedSelection.stake = updatedSelection.stake + 1;
      updateSelection(updatedSelection);
      const totalStake = selections.reduce(
        (total, selection) => total + (selection.stake ?? 0),
        0,
      );
      setTotalStake(totalStake);
    } else if (updatedSelection) {
      updatedSelection.stake = 1;
      updateSelection(updatedSelection);
    }
  };

  const handleDecreaseS = (optionId: string) => {
    const updatedSelection = selections.find(
      (selection) => selection.optionId === optionId,
    );
    if (updatedSelection?.stake) {
      updatedSelection.stake = updatedSelection.stake - 1;
      updateSelection(updatedSelection);
      const totalStake = selections.reduce(
        (total, selection) => total + (selection.stake ?? 0),
        0,
      );
      setTotalStake(totalStake);
    }
  };

  const handleMultiStakeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const stakeValue = parseFloat(event.target.value);
    if (!isNaN(stakeValue) && stakeValue >= 0) {
      updateMultiSelection(stakeValue);
    }
  };

  const handleSubmitBet = () => {
    onClose();
  };

  const handleIncrease = (eventId: string, index: number) => {
    // Ensure currentStake is treated as a number, even if it's a string
    const currentStake = Number(multiSelection[eventId][index]?.stake) || 0;
    const increment = 1;
    const newStake = currentStake + increment;
    // Update the stake in your state here, convert newStake back to string if necessary
    handleMultiStakeChange({
      target: { value: newStake.toString() },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDecrease = (eventId: string, index: number) => {
    const currentStake = Number(multiSelection[eventId][index]?.stake) || 0;
    const decrement = 1;
    const newStake =
      currentStake - decrement >= 0 ? currentStake - decrement : 0;
    // Update the stake in your state here, convert newStake back to string if necessary
    handleMultiStakeChange({
      target: { value: newStake.toString() },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const selectionsByEvent: { [eventId: string]: BetSelection[] } = {};
  selections.forEach((selection) => {
    if (!selectionsByEvent[selection.eventId]) {
      selectionsByEvent[selection.eventId] = [];
    }
    selectionsByEvent[selection.eventId].push(selection);
  });

  return (
    <>
      <Dialog
        container={() => document.querySelector(".mainPage")}
        TransitionComponent={Transition}
        keepMounted
        fullScreen
        style={{
          transition: "all 0.5s ease-in-out",
          position: "absolute",
          maxWidth: "350px",
          justifySelf: "flex-end",
          padding: "0px 0px 0px 0px",
        }}
        open={open}
        onClose={onClose}
        aria-labelledby="bet-slip-dialog-title"
      >
        <FooterComponent onOpen={handleToggle} open={true} />
        <DialogTitle id="bet-slip-dialog-title">Bet Slip</DialogTitle>
        <DialogContent>
          {Object.values(selectionsByEvent).map((eventSelections, index) => {
            if (eventSelections.length > 1) {
              // Calculate total odds
              const totalOdds = eventSelections.reduce(
                (total, selection) => total * selection.odds,
                1,
              );

              return (
                <div
                  key={index}
                  className="multiBetContainer"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="multiBetHeader smallerText">
                    <button className="ctaButton">CREATE YOUR BET</button>
                  </div>
                  <div
                    style={{ float: "left", marginRight: "45px" }}
                    className="selectionCount"
                  >
                    [CYB] &nbsp;
                    {eventSelections.length} SELECTIONS
                  </div>
                  <div> Odds: {totalOdds.toFixed(2)}</div>
                  <ul className="timeline">
                    {eventSelections.map((selection, sIndex) => (
                      <li key={sIndex} className="timeline-item">
                        <div className="timeline-icon-wrapper">
                          <div className="timeline-icon"></div>
                        </div>
                        <div className="timeline-content">
                          <div className="betDetails">
                            <div className="betMatch">{selection.name}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>{" "}
                  <IconButton
                    style={{
                      float: "right",
                      marginTop: "-25px",
                      marginRight: "10px",
                    }}
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
                    <button
                      className="input-group-btn"
                      onClick={() =>
                        handleDecrease(eventSelections[0].eventId, index)
                      }
                    >
                      -
                    </button>
                    <span className="dollarSymbol">$</span>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        multiSelection[eventSelections[0].eventId][index]?.stake
                      }
                      onChange={(e) => handleMultiStakeChange(e)}
                    />
                    <button
                      className="input-group-btn"
                      onClick={() =>
                        handleIncrease(eventSelections[0].eventId, index)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}

          <div className="multiBetHeader smallerText">
            <button className="ctaButton">singles</button>
          </div>
          {selections.map((selection: BetSelection, index: number) => (
            <div key={index}>
              <div className="singleTitle">{selection.name}</div>

              <IconButton
                style={{
                  right: "20px",
                  position: "absolute",
                  marginTop: "-30px",
                  marginRight: "0px",
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
                    onClick={() => handleDecreaseS(selections[index].optionId)}
                  >
                    -
                  </button>
                  <span className="dollarSymbol">$</span>
                  <input
                    type="text"
                    className="form-control"
                    value={selections[index].stake}
                    onChange={(e) => handleMultiStakeChange(e)}
                  />
                  <button
                    className="input-group-btn"
                    onClick={() => handleIncreaseS(selections[index].optionId)}
                  >
                    +
                  </button>
                </div>
                <span
                  style={{ margin: "10px 8px 8px 8px", marginTop: "10px" }}
                >{`+${selection.odds}`}</span>
              </div>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitBet} color="primary">
            Place Bet
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BetSlipComponent;
