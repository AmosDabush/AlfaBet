import { BetSelection } from "../types/contextTypes";

export const calculateTotalOdds = (selections: BetSelection[]): number => {
  return selections.reduce((total, selection) => total * selection.odds, 1);
};
