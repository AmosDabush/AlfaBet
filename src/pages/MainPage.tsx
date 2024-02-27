import { useEffect, useState } from "react";
import { useBetSlip } from "../contexts/BetSlipContext";
import BetSlipComponent from "../components/BetSlipComponent/BetSlipComponent";
import FooterComponent from "../components/FooterComponent/FooterComponent";
import SportSelectionBar from "../components/SportSelectionBar/SportSelectionBar"; // Adjust the path
import EventSelectionBar from "../components/EventSelectionBar/EventSelectionBar"; // Adjust the path
import EventsDisplay from "../components/EventsDisplay/EventsDisplay"; // Adjust the path
import { BetSelection } from "../types/contextTypes";
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
        <SportSelectionBar
          selectedSport={selectedSport}
          eventsData={eventsData}
          onSelectSport={setSelectedSport}
          onSelectEvent={setSelectedEvent}
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
