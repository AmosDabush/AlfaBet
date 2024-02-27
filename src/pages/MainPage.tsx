import { useEffect, useState } from "react";
import { useBetSlip } from "../contexts/useBetSlip";
import { BetSelection } from "../types/contextTypes";
import BetSlipComponent from "../components/BetSlipComponent/BetSlipComponent";
import FooterComponent from "../components/FooterComponent/FooterComponent";
import SportSelectionBar from "../components/SportSelectionBar/SportSelectionBar";
import EventSelectionBar from "../components/EventSelectionBar/EventSelectionBar";
import EventsDisplay from "../components/EventsDisplay/EventsDisplay";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import "./MainPage.css";
const MainPage = () => {
  const [betSlipOpen, setBetSlipOpen] = useState(false);
  const { eventsData, addSelection, selections } = useBetSlip();
  const [selectedSport, setSelectedSport] = useState<string>("All");
  const [selectedEvent, setSelectedEvent] = useState<string>("All");

  const toggleBetSlip = () => {
    setBetSlipOpen(!betSlipOpen);
  };

  const closeBetSlip = () => {
    setBetSlipOpen(false);
  };

  const handleAddSelection = (selection: BetSelection) => {
    addSelection(selection);
    console.log({ selection, selections });
  };

  useEffect(() => {
    setSelectedEvent("All");
  }, [selectedSport]);

  return (
    <>
      <div className="mainPage">
        <HeaderComponent
          toggleBetSlip={toggleBetSlip}
          isSlipOpen={betSlipOpen}
        />
        <SportSelectionBar
          selectedSport={selectedSport}
          eventsData={eventsData}
          onSelectSport={setSelectedSport}
        />
        <EventSelectionBar
          selectedSport={selectedSport}
          selectedEvent={selectedEvent}
          eventsData={eventsData}
          onSelectEvent={setSelectedEvent}
        />
        <EventsDisplay
          eventsData={eventsData}
          selectedSport={selectedSport}
          selectedEvent={selectedEvent}
          selections={selections}
          handleAddSelection={handleAddSelection}
        />
      </div>
      <div>
        <FooterComponent onOpen={toggleBetSlip} open={betSlipOpen} />
        <BetSlipComponent
          open={betSlipOpen}
          onClose={closeBetSlip}
          handleToggle={toggleBetSlip}
        />
      </div>
    </>
  );
};

export default MainPage;
