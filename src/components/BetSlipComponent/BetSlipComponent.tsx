import React, { useState } from "react";
import { useBetSlip } from "../../contexts/useBetSlip";
import { BetSelection } from "../../types/contextTypes";
import { TransitionProps } from "@mui/material/transitions";
import { calculateTotalOdds } from "../../helpers/helpers";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import FooterComponent from "../FooterComponent/FooterComponent";
import MultiBetComponent from "./MultiBetComponent/MultiBetComponent";
import ReceiptDialog from "./ReceiptDialog/ReceiptDialog";
import CollapsibleSection from "./CollapsibleSection/CollapsibleSection";
import "./BetSlipComponent.css";

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
    updateMultiSelection,
    totalStake,
  } = useBetSlip();
  const [multiStake, setMultiStake] = useState(0);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [error, setError] = useState("false");

  const [receiptData, setReceiptData] = useState<
    | {
        [key: string]: string | number | { [key: string]: string | number };
      }
    | object
    | null
  >(null);
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
    console.log("Submitting bet...");
    const totalOdds = calculateTotalOdds(selections);
    const receiptData = {
      ...selections.map((s) => ({ [s.name]: s.stake })),
      stake: totalStake + multiStake,
      odds: totalOdds,
    };
    setReceiptData(receiptData);
    setReceiptOpen(true);

    onClose();
  };
  const handleIncrease = () => {
    setMultiStake((prevStake) => prevStake + 1);
  };

  const handleDecrease = () => {
    setMultiStake((prevStake) => (prevStake - 1 >= 0 ? prevStake - 1 : 0));
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
          {Object.values(selectionsByEvent).map((eventSelections, index) => (
            <MultiBetComponent
              key={index}
              eventSelections={eventSelections}
              handleRemoveSelection={handleRemoveSelection}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
              handleMultiStakeChange={handleMultiStakeChange}
              stake={multiStake}
              error={error}
              setError={setError}
            />
          ))}
          {selections.length > 0 && (
            <CollapsibleSection
              selections={selections}
              handleRemoveSelection={handleRemoveSelection}
              handleDecreaseS={handleDecreaseS}
              handleIncreaseS={handleIncreaseS}
              handleStakeChange={handleStakeChange}
            />
          )}
        </DialogContent>
        {error.length > 0 && (
          <h5 style={{ color: "red" }}>
            please resolve all errors before placing bet
          </h5>
        )}
        <DialogActions>
          <Button
            disabled={selections.length === 0 || error.length > 0}
            onClick={handleSubmitBet}
            variant="contained"
            fullWidth={true}
            color="success"
          >
            Place Bet
          </Button>
        </DialogActions>
      </Dialog>
      <ReceiptDialog
        open={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        receiptData={receiptData}
      />
    </>
  );
};

export default BetSlipComponent;
