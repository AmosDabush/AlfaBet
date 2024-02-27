import React, { useState } from "react";
import SingleBetComponent from "../SingleBetComponent/SingleBetsComponent";
import { BetSelection } from "../../../types/contextTypes";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "../BetSlipComponent.css";

interface CollapsibleSectionProps {
  selections: BetSelection[];
  handleRemoveSelection: (optionId: string) => void;
  handleDecreaseS: (optionId: string) => void;
  handleIncreaseS: (optionId: string) => void;
  handleStakeChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    optionId: string,
  ) => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  selections,
  handleRemoveSelection,
  handleDecreaseS,
  handleIncreaseS,
  handleStakeChange,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`collapsibleSection ${collapsed ? "collapsed" : ""}`}>
      <div className="multiBetHeader smallerText" onClick={toggleCollapse}>
        <span className={`arrow ${collapsed ? "collapse" : ""}`}>
          <ArrowForwardIosIcon sx={{ width: "18px" }} />
        </span>
        <button className="ctaButton">singles</button>
      </div>
      {!collapsed && (
        <>
          {selections.map((selection: BetSelection, index: number) => (
            <SingleBetComponent
              key={index}
              selection={selection}
              index={index}
              handleRemoveSelection={handleRemoveSelection}
              handleDecreaseS={handleDecreaseS}
              handleIncreaseS={handleIncreaseS}
              handleStakeChange={handleStakeChange}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CollapsibleSection;
