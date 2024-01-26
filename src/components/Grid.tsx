import React from "react";
import "../styles/Grid.css";

interface GridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  type: "movie" | "post";
}

function Grid<T>({ items, renderItem,type }: GridProps<T>) {
  return (
    <div className={type+"-grid"}>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

export default Grid;
