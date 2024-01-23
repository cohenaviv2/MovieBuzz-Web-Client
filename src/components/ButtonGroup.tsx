import React, { useRef } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import "../styles/ButtonGroup.css";

export interface Button {
  label: string;
  onClick: () => void;
  cName: string;
}

interface ButtonGroupProps {
  buttons: Button[];
  type: "filter" | "genre";
}

function ButtonGroup({ buttons, type }: ButtonGroupProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollOffset = 100;

  const handleScroll = (scrollOffset: number) => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop += scrollOffset;
    }
  };

  return (
    <div className="toolbar">
      <div className={type + "-btn-group"}>
        <div className={type + "-btn-container"} ref={wrapperRef}>
          {buttons.map((button, index) => (
            <button
              className={button.cName}
              key={index}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
        {type == "genre" && (
          <div className="scroll-btn-container">
            <button
              className="scroll-btn"
              onClick={() => handleScroll(-scrollOffset)}
            >
              <MdOutlineKeyboardArrowUp size="30px" />
            </button>
            <button
              className="scroll-btn"
              onClick={() => handleScroll(scrollOffset)}
            >
              <MdOutlineKeyboardArrowDown size="30px" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ButtonGroup;
