import { IMovie, ITvShow } from "../../services/CommonTypes";
import noImageAvailable from "../../assets/no_image_avaliable.png"
import "../../styles/movie/MovieCard.css";

const TMDB_NULL_IMAGE_URL = import.meta.env.TMDB_NULL_IMAGE_URL;

interface MovieCardProps {
  movie: IMovie | ITvShow;
}

function MovieCard({ movie }: MovieCardProps) {
  const maxTitleLength = 25;

  const posterPath =
    movie.poster_path == TMDB_NULL_IMAGE_URL
      ? noImageAvailable
      : movie.poster_path;

    const movieTitle =
      movie.title.length > maxTitleLength
        ? movie.title.slice(0, maxTitleLength).replace("\n", " ") + "..."
        : movie.title;

  return (
    <div className="movie-card">
      <img className="movie-card-img" src={posterPath} alt={movieTitle} />
      <h6>
        {movieTitle}
      </h6>
    </div>
  );
}

export default MovieCard;
