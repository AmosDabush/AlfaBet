import React, { createContext, useContext, useState, ReactNode } from "react";
import mockData from "../data/mockData.json";
import { BetSelection, Event } from "../types/contextTypes";

type MultiSelectionItem = {
  eventId: string;
  stake: string;
  multiSelection: BetSelection[];
};

type BetSlipContextType = {
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

const BetSlipContext = createContext<BetSlipContextType>(defaultState);

export const useBetSlip = () => useContext(BetSlipContext);

type BetSlipProviderProps = {
  children: ReactNode;
};

export const BetSlipProvider: React.FC<BetSlipProviderProps> = ({
  children,
}: BetSlipProviderProps) => {
  const [state, setState] = useState(defaultState);

  const addSelection = (newSelection: BetSelection) => {
    setState((prevState) => {
      const eventId = newSelection.eventId;

      // Check if the new selection already exists in the current selections
      const existingSelectionIndex = prevState.selections.findIndex(
        (selection) =>
          selection.eventId === newSelection.eventId &&
          selection.marketId === newSelection.marketId,
      );

      // If the selection already exists, update it
      if (existingSelectionIndex !== -1) {
        const updatedSelections = [...prevState.selections];
        updatedSelections[existingSelectionIndex] = newSelection;

        return {
          ...prevState,
          selections: updatedSelections,
        };
      }

      // Otherwise, add the new selection
      const updatedSelections = [...prevState.selections, newSelection];

      const existingMultiSelections = prevState.multiSelection[eventId] || [];

      // Check if more than 2 selections already exist for the event
      if (existingMultiSelections.length >= 2) {
        // If more than 2 selections already, do nothing
        return { ...prevState, selections: updatedSelections };
      }

      const newMultiSelection: MultiSelectionItem = {
        eventId,
        stake: "",
        multiSelection: updatedSelections,
      };

      const updatedMultiSelection = {
        ...prevState.multiSelection,
        [eventId]: [...existingMultiSelections, newMultiSelection],
      };

      return {
        ...prevState,
        selections: updatedSelections,
        multiSelection: updatedMultiSelection,
      };
    });
  };

  const removeSelection = (selectionId: string) => {
    setState((prevState) => ({
      ...prevState,
      selections: prevState.selections.filter(
        (selection) => selection.optionId !== selectionId,
      ),
    }));
  };

  const updateSelection = (updatedSelection: BetSelection) => {
    setState((prevState) => ({
      ...prevState,
      selections: prevState.selections.map((selection) =>
        selection.optionId === updatedSelection.optionId &&
        selection.marketId === updatedSelection.marketId &&
        selection.eventId === updatedSelection.eventId
          ? updatedSelection
          : selection,
      ),
    }));
  };

  const addMultiSelection = (selections: BetSelection[]) => {
    setState((prevState) => {
      const selectionsByEvent: Record<string, BetSelection[]> = {};
      selections.forEach((selection) => {
        if (!selectionsByEvent[selection.eventId]) {
          selectionsByEvent[selection.eventId] = [];
        }
        selectionsByEvent[selection.eventId].push(selection);
      });

      const updatedMultiSelection = { ...prevState.multiSelection };
      Object.keys(selectionsByEvent).forEach((eventId) => {
        const existingMultiSelections = prevState.multiSelection[eventId] || [];
        if (existingMultiSelections.length < 2) {
          const newMultiSelection: MultiSelectionItem = {
            eventId,
            stake: "",
            multiSelection: selectionsByEvent[eventId],
          };
          updatedMultiSelection[eventId] = [
            ...(existingMultiSelections || []),
            newMultiSelection,
          ];
        }
      });

      return {
        ...prevState,
        multiSelection: updatedMultiSelection,
      };
    });
  };

  const removeMultiSelection = () => {
    setState((prevState) => ({
      ...prevState,
      multiSelection: {},
    }));
  };

  const updateMultiSelection = (stake: number) => {
    console.log({ multiSelection: state.multiSelection });

    setState((prevState) => ({
      ...prevState,
      multiSelection: Object.keys(prevState.multiSelection).reduce(
        (acc, eventId) => ({
          ...acc,
          [eventId]: prevState.multiSelection[eventId].map((item) => ({
            ...item,
            stake: stake.toString(),
          })),
        }),
        {},
      ),
    }));
  };

  const setTotalStake = (amount: number) => {
    setState((prevState) => ({ ...prevState, totalStake: amount }));
  };

  return (
    <BetSlipContext.Provider
      value={{
        ...state,
        addSelection,
        removeSelection,
        updateSelection,
        addMultiSelection,
        removeMultiSelection,
        updateMultiSelection,
        setTotalStake,
      }}
    >
      {children}
    </BetSlipContext.Provider>
  );
};
