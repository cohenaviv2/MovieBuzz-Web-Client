import React, { useRef } from "react";
import { RiArrowRightSFill } from "react-icons/ri";
import { RiArrowLeftSFill } from "react-icons/ri";
import styles from "./List.module.scss";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  type: "movie" | "post";
}

function List<T>({ items, renderItem, type }: ListProps<T>) {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = type == "post" ? 400 : 200;

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollLeft -= scrollSpeed;
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollLeft += scrollSpeed;
    }
  };

  return (
    <div className={styles.listContainer}>
      <button className={styles.arrowBtn} onClick={scrollLeft}>
        <RiArrowLeftSFill size="30px" />
      </button>
      <div className={styles.list} ref={listRef}>
        {items.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </div>
      <button className={styles.arrowBtn} onClick={scrollRight}>
        <RiArrowRightSFill size="30px" />
      </button>
    </div>
  );
}

export default List;
