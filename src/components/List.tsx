import React, { useRef } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import "../styles/List.css";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = 150;

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollLeft -= scrollSpeed; // Adjust scroll speed as needed
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollLeft += scrollSpeed; // Adjust scroll speed as needed
    }
  };

  return (
    <div className="list-container">
      <button className="arrow-btn" onClick={scrollLeft}>
        <MdKeyboardArrowLeft size="25px" />
      </button>
      <div className="list" ref={listRef}>
        {items.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </div>
      <button className="arrow-btn" onClick={scrollRight}>
        <MdKeyboardArrowRight size="25px" />
      </button>
    </div>
  );
}

export default List;
