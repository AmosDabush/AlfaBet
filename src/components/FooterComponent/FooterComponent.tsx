import { useBetSlip } from "../../contexts/BetSlipContext";
import Button from "@mui/material/Button";
import "./FooterComponent.css";
const FooterComponent = ({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: () => void;
}) => {
  const { selections } = useBetSlip();

  if (selections.length === -10) return null; // Don't display if no selections

  const totalOdds = selections.reduce(
    (acc, selection) => acc * selection.odds,
    1,
  );

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onOpen}
      className="showFooter"
      style={open ? { display: "none" } : { position: "absolute" }}
    >
      {`Bet Slip (${selections.length}) - Total Odds: ${totalOdds.toFixed(2)}`}
    </Button>
  );
};

export default FooterComponent;
