import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface ReceiptDialogProps {
  open: boolean;
  onClose: () => void;
  receiptData: { [key: string]: string | number } | null;
}

const ReceiptDialog: React.FC<ReceiptDialogProps> = ({
  open,
  onClose,
  receiptData,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      fullScreen
      container={() => document.querySelector(".mainPage")}
      style={{
        transition: "all 0.5s ease-in-out",
        position: "absolute",
        display: "flex",
        alignSelf: "center",
        left: 0,
        right: "auto",
        padding: "0px 0px 0px 0px",
      }}
    >
      <DialogTitle>Receipt</DialogTitle>
      <DialogContent>
        {receiptData && (
          <>
            {Object.entries(receiptData).map(([key, value]) => (
              <div key={key}>
                <p>{key}:</p>
                {typeof value === "object" ? (
                  <ul>
                    {Object.entries(value).map(([nestedKey, nestedValue]) => (
                      <li key={nestedKey}>
                        {nestedKey} <span style={{ color: "green" }}>stake:{(nestedValue as string)}</span> 
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{value}</p>
                )}
              </div>
            ))}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReceiptDialog;
