import { useState } from "react";
import ButtonGroup, { Button } from "../ButtonGroup";
import {
  MovieGenres,
  MovieFilters,
  TvShowFilters,
  TvShowGenres,
} from "./MoviesData";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import "../../styles/movie/MovieToolbar.css";

interface ToolbarProps {
  type: "movies" | "tv";
}

function MovieToolbar({ type }: ToolbarProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const title = type == "movies" ? "Movies" : "TV Shows";
  const expandButtonIcon = isExpanded ? <MdExpandLess /> : <MdExpandMore />;

  const sliceIndex = type == "movies" ? 4 : 3;
  const filterList = type == "movies" ? MovieFilters : TvShowFilters;
  const genreList = type == "movies" ? MovieGenres : TvShowGenres;

  function createButton(label: string, onClick: () => void, cName: string) {
    return {
      label,
      onClick,
      cName,
    };
  }

  const filterButtons: Button[] = filterList.map((filter) =>
    createButton(filter, () => handleFilterClick(filter), "filter-btn")
  );

  const genreButtons: Button[] = (genreList || []).map((genre) =>
    createButton(genre.name, () => handleGenreClick(genre.name), "genre-btn")
  );

  function handleGenreClick(genre: string) {
    if (isExpanded) setIsExpanded((prev) => !prev);
    console.log(genre);
  }

  function handleFilterClick(filter: string) {
    if (isExpanded) setIsExpanded((prev) => !prev);
    console.log(filter);
  }

  const handleExpandGenres = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <div className="toolbar">
        <ButtonGroup type="filter" buttons={filterButtons} />
        <div className="toolbar-title">{title}</div>
        <ButtonGroup type="genre" buttons={genreButtons.slice(0, sliceIndex)} />
        <div className="toolbar-btn-container">
          <button className="toolbar-btn" onClick={handleExpandGenres}>
            {expandButtonIcon}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="toolbar-expand">
          {genreButtons
            .slice(sliceIndex, genreButtons.length - 2)
            .map((button, index) => (
              <button
                className={button.cName}
                key={index}
                onClick={button.onClick}
              >
                {button.label}
              </button>
            ))}
        </div>
      )}
    </>
  );
}

export default MovieToolbar;
