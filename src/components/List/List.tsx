import React, { useRef } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import styles from "./List.module.scss"

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  type: "movie" | "post";
}

function List<T>({ items, renderItem,type }: ListProps<T>) {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = type == "post" ?350 : 200;

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
    <div className={styles.listContainer}>
      <button className={styles.arrowBtn} onClick={scrollLeft}>
        <MdKeyboardArrowLeft size="30px" />
      </button>
      <div className={styles.list} ref={listRef}>
        {items.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </div>
      <button className={styles.arrowBtn} onClick={scrollRight}>
        <MdKeyboardArrowRight size="30px" />
      </button>
    </div>
  );
}

export default List;
