import { createContext } from "react";
import mockData from "../data/mockData.json";
import { BetSelection, Event } from "../types/contextTypes";

type MultiSelectionItem = {
  eventId: string;
  stake: string;
  multiSelection: BetSelection[];
};

export type BetSlipContextType = {
  selections: BetSelection[];
  multiSelection: { [key: string]: MultiSelectionItem[] };
  addSelection: (selection: BetSelection) => void;
  removeSelection: (selectionId: string) => void;
  updateSelection: (updatedSelection: BetSelection) => void;
  addMultiSelection: (selections: BetSelection[]) => void;
  removeMultiSelection: () => void;
  updateMultiSelection: (stake: number) => void;
  totalStake: number;
  setTotalStake: (amount: number) => void;
  eventsData: { [key: string]: Event[] };
};

const defaultState: BetSlipContextType = {
  selections: [],
  multiSelection: {},
  addSelection: () => {},
  removeSelection: () => {},
  updateSelection: () => {},
  addMultiSelection: () => {},
  removeMultiSelection: () => {},
  updateMultiSelection: () => {},
  totalStake: 0,
  setTotalStake: () => {},
  eventsData: mockData.sports,
};

export const BetSlipContext = createContext<BetSlipContextType>(defaultState);
