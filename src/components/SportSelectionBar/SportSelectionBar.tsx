// SportSelectionBar.tsx
import React, { useState, useEffect, useRef } from "react";
import { Button, Tooltip, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./SportSelectionBar.css";

interface SportSelectionBarProps {
  selectedSport: string;
  eventsData: { [key: string]: any };
  onSelectSport: (sport: string) => void;
  onSelectEvent: (eventId: string) => void;
}

const SportSelectionBar: React.FC<SportSelectionBarProps> = ({
  selectedSport,
  eventsData,
  onSelectSport,
  onSelectEvent,
}) => {
  const sports = ["All", ...Object.keys(eventsData)];
  const [currentIndex, setCurrentIndex] = useState(0);
  const sportScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the selected item position when it changes
    if (sportScrollRef.current) {
      const selectedItem = sportScrollRef.current.querySelector(
        `.sportButton[data-sport="${selectedSport}"]`,
      );
      if (selectedItem instanceof HTMLElement) {
        sportScrollRef.current.scrollLeft =
          selectedItem.offsetLeft -
          sportScrollRef.current.offsetWidth / 2 +
          selectedItem.offsetWidth / 2;
      }
    }
  }, [selectedSport]);

  const rotateSports = (direction: "left" | "right") => {
    setCurrentIndex((prevIndex) => {
      if (direction === "left") {
        const nextIndex = prevIndex === 0 ? sports.length - 1 : prevIndex - 1;
        onSelectSport(sports[nextIndex]);
        return nextIndex;
      } else {
        const nextIndex = prevIndex === sports.length - 1 ? 0 : prevIndex + 1;
        onSelectSport(sports[nextIndex]);
        return nextIndex;
      }
    });
  };

  const renderSportsButtons = () => {
    return sports.map((sportType) => {
      const isSelected = selectedSport === sportType;
      return (
        <Tooltip title={sportType} key={sportType}>
          <button
            className={`sportButton ${isSelected ? "selected" : ""}`}
            onClick={() => onSelectSport(sportType)}
            data-sport={sportType}
          >
            {sportType[0]}
          </button>
        </Tooltip>
      );
    });
  };

  return (
    <div
      className="sportSelectionContainer"
    >
      <div onClick={() => rotateSports("left")} className="arrowButton left">
        <ArrowBackIosIcon />
      </div>
      <div className="sportScrollContainer" ref={sportScrollRef}>
        {renderSportsButtons()}
      </div>
      <div onClick={() => rotateSports("right")} className="arrowButton right">
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};

export default SportSelectionBar;
