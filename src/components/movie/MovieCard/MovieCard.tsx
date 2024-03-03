import { IMovie, ITvShow } from "../../../services/Types";
import noImageAvailable from "../../../assets/no_image_avaliable.png";
import styles from "./MovieCard.module.scss";

export const TMDB_NULL_IMG_URL = "https://image.tmdb.org/t/p/w500null";

interface MovieCardProps {
  movie: IMovie | ITvShow;
}

function MovieCard({ movie }: MovieCardProps) {
  const maxTitleLength = 25;

  const posterPath = movie.poster_path === TMDB_NULL_IMG_URL ? noImageAvailable : movie.poster_path;

  const movieTitle = movie.title.length > maxTitleLength ? movie.title.slice(0, maxTitleLength).replace("\n", " ") + "..." : movie.title;

  return (
    <div className={styles.movieCard}>
      <div className={styles.imgContainer}>
        <img src={posterPath} alt={movieTitle} />
      </div>
      <div className={styles.cardTitle}>{movieTitle}</div>
    </div>
  );
}

export default MovieCard;
