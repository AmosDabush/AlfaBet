import React, { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
interface SelectionType {
  stake: number;
  eventId: string; // Or number, depending on your ID type
  optionId: string; // Or number, depending on your ID type
  index: number; // Add other properties as needed
}

interface CustomNumberInputProps {
  selection: SelectionType;
  handleStakeChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    optionId: string,
  ) => void;
  handleIncrease: (eventId: string, index: number) => void;
  handleDecrease: (eventId: string, index: number) => void;
}
function CustomNumberInput({
  selection,
  handleStakeChange,
  handleIncrease,
  handleDecrease,
}: CustomNumberInputProps) {
  const eventId = selection.eventId;
  const optionId = selection.optionId;
  const index = selection.index; // Assuming index is a property of the selection object

  return (
    <TextField
      label="Stake"
      type="number"
      value={selection.stake}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        handleStakeChange(event, optionId)
      }
      fullWidth
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              onClick={() => handleDecrease(eventId, index)}
              edge="start"
            >
              <RemoveIcon />
            </IconButton>
            <span>$</span>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => handleIncrease(eventId, index)}
              edge="end"
            >
              <AddIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default CustomNumberInput;
