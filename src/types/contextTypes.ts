export type MarketOption = {
  eventId: number;
  optionId: string;
  name: string;
  odds: number;
};

export type Market = {
  marketId: string;
  title: string;
  options: MarketOption[];
};

export type Event = {
  eventId: string;
  eventName: string;
  eventStatus: string;
  markets: Market[];
};

export interface BetSelection {
  eventId: string;
  marketId: string;
  optionId: string;
  odds: number;
  name: string;
  stake?: number;
}

export type BetSlipContextType = {
  selections: BetSelection[];
  addSelection: (selection: BetSelection) => void;
  removeSelection: (selectionId: string) => void;
  totalStake: number;
  setTotalStake: (amount: number) => void;
  eventsData: Event[]; // Rename to eventsData
};
