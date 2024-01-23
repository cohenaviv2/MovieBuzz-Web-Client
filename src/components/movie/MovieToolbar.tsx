import ButtonGroup, { Button } from "../ButtonGroup";
import {
  MovieGenres,
  MovieFilters,
  TvShowFilters,
  TvShowGenres,
} from "./MoviesData";
import "../../styles/movie/MovieToolbar.css";

interface ToolbarProps {
  type: "movies" | "tv";
}

function MovieToolbar({ type }: ToolbarProps) {
  const title = type == "movies" ? "Movies" : "TV Shows";

  const filterList = type == "movies" ? MovieFilters : TvShowFilters;
  const genreList = type == "movies" ? MovieGenres : TvShowGenres;

  function createButton(label: string, onClick: () => void, cName: string):Button {
    return {
      label,
      onClick,
      cName,
    };
  }
  const filterButtons = filterList.map((filter) =>
    createButton(filter, () => handleFilterClick(filter), "filter-btn")
  );
  const genreButtons = (genreList || []).map((genre) =>
    createButton(genre.name, () => handleGenreClick(genre.name), "genre-btn")
  );

  function handleGenreClick(genre: string) {
    console.log(genre);
  }

  function handleFilterClick(filter: string) {
    console.log(filter);
  }

  return (
    <>
      <div className="toolbar">
        <div className="toolbar-title">{title}</div>
        <ButtonGroup type="filter" buttons={filterButtons} />
        <ButtonGroup type="genre" buttons={genreButtons} />
      </div>
    </>
  );
}

export default MovieToolbar;
