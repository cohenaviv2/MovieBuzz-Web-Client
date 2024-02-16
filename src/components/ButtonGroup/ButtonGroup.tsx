import { useRef } from "react";
import { Button } from "./ButtonUtils";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import styles from "./ButtonGroup.module.scss";

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
    <div className={type == "filter" ? styles.filterBtnGroup : styles.genreBtnGroup}>
      <div className={type == "filter" ? styles.filterBtnContainer : styles.genreBtnContainer} ref={wrapperRef}>
        {buttons.map((button, index) => (
          <button className={button.cName} key={index} onClick={button.onClick}>
            {button.icon && button.icon}
            {button.label}
          </button>
        ))}
      </div>
      {type == "genre" && (
        <div className={styles.scrollBtnContainer}>
          <button className={styles.scrollBtn} onClick={() => handleScroll(-scrollOffset)}>
            <MdOutlineKeyboardArrowUp size="30px" />
          </button>
          <button className={styles.scrollBtn} onClick={() => handleScroll(scrollOffset)}>
            <MdOutlineKeyboardArrowDown size="30px" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ButtonGroup;
