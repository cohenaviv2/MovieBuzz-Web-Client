import ButtonGroup from "../../ButtonGroup/ButtonGroup";
import { createButton } from "../../ButtonGroup/ButtonUtils";
import Spinner from "../../Spinner/Spinner";
import { MovieFilterButton, MovieGenreButtons, TvShowFilterButton, TvShowGenreButtons } from "../MoviesData";
import styles from "./MovieToolbar.module.scss";

interface ToolbarProps {
  type: "movies" | "tv";
  handleFilterSelection: (value: string) => void;
  loading: boolean;
}

function MovieToolbar({ type, handleFilterSelection, loading }: ToolbarProps) {
  const title = type === "movies" ? "Movies" : "TV Shows";

  const filterBtnList = type === "movies" ? MovieFilterButton : TvShowFilterButton;
  const genreBtnList = type === "movies" ? MovieGenreButtons : TvShowGenreButtons;

  const filterButtons = filterBtnList.map((btn) => createButton(btn.label, () => handleFilterSelection(btn.path!), btn.cName, btn.path, btn.icon));
  const genreButtons = genreBtnList.map((btn) => createButton(btn.label, () => handleFilterSelection(btn.label), btn.cName, btn.path, btn.icon));

  return (
    <div className={styles.toolbar}>
      <div className={styles.spinnerContainer}>{loading && <Spinner />}</div>
      <h3>{title}</h3>
      <ButtonGroup type="filter" buttons={filterButtons} />
      <ButtonGroup type="genre" buttons={genreButtons} />
    </div>
  );
}

export default MovieToolbar;
