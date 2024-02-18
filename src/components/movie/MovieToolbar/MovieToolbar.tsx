import ButtonGroup from "../../ButtonGroup/ButtonGroup";
import { createButton } from "../../ButtonGroup/ButtonUtils";
import { MovieFilterButton, MovieGenreButtons, TvShowFilterButton, TvShowGenreButtons } from "../MoviesData";
import { genres } from "../genres";
import styles from "./MovieToolbar.module.scss";

interface ToolbarProps {
  type: "movies" | "tv";
  handleFilterSelection: (value: string) => void;
}

function MovieToolbar({ type, handleFilterSelection }: ToolbarProps) {
  const title = type == "movies" ? "Movies" : "TV Shows";

  const filterBtnList = type == "movies" ? MovieFilterButton : TvShowFilterButton;
  const genreBtnList = type == "movies" ? MovieGenreButtons : TvShowGenreButtons;

  const filterButtons = filterBtnList.map((btn) => createButton(btn.label, () => handleFilterSelection(btn.path!), btn.cName, btn.path, btn.icon));
  const genreButtons = genreBtnList.map((btn) => createButton(btn.label, () => handleFilterSelection(btn.label), btn.cName, btn.path, btn.icon));

  function handleGenreClick(genre: string) {
    console.log(genre);
  }

  // function handleFilterClick(filter: string) {
  //   console.log(filter)
  //   setFilter(filter);
  // }

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
