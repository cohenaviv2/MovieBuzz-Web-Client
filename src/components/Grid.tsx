import React from "react";
import "../styles/Grid.css";

interface GridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function Grid<T>({ items, renderItem }: GridProps<T>) {
  return (
    <div className="grid">
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

export default Grid;
