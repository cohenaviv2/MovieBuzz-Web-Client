import ButtonGroup from "../../ButtonGroup/ButtonGroup";
import { createButton } from "../../ButtonGroup/ButtonData";
import { MovieFilterButton, MovieGenreButtons, TvShowFilterButton, TvShowGenreButtons } from "../MoviesData";
import styles from "./MovieToolbar.module.scss";

interface ToolbarProps {
  type: "movies" | "tv";
}

function MovieToolbar({ type }: ToolbarProps) {
  const title = type == "movies" ? "Movies" : "TV Shows";

  const filterBtnList = type == "movies" ? MovieFilterButton : TvShowFilterButton;
  const genreBtnList = type == "movies" ? MovieGenreButtons : TvShowGenreButtons;

  const filterButtons = filterBtnList.map((filter) => createButton(filter.label, () => handleFilterClick(filter.label), filter.cName, filter.icon));
  const genreButtons = genreBtnList.map((genre) => createButton(genre.label, () => handleGenreClick(genre.label), genre.cName,genre.icon));

  function handleGenreClick(genre: string) {
    console.log(genre);
  }

  function handleFilterClick(filter: string) {
    console.log(filter);
  }

  return (
    <>
      <div className={styles.toolbar}>
        <h3>{title}</h3>
        <ButtonGroup type="filter" buttons={filterButtons} />
        <ButtonGroup type="genre" buttons={genreButtons} />
      </div>
    </>
  );
}

export default MovieToolbar;
