import { IMovieDetails, ITvShow } from "../../services/CommonTypes";
import { IoClose } from "react-icons/io5";
import { MovieGenres } from "./MoviesData";
import "../../styles/movie/MovieDetails.css";

interface MovieDetailsProps {
  movie: IMovieDetails | ITvShow;
  onClose: () => void;
}

function MovieDetails({ movie, onClose }: MovieDetailsProps) {
  const genres = movie.genre_ids.map(
    (genre_id) => MovieGenres.find((item) => item.id === genre_id)?.name
  );

  return (
    <div className="movie-details">
      <img src={movie.poster_path} className="movie-details-img"></img>
      <div className="movie-details-container">
        <div className="title-container">
          <h2>{movie.title}</h2>
          <h5 className="year-tag">{movie.year}</h5>
        </div>
        <div className="tags-container">
          {genres.map((genre) => (
            <h5 className="genre-tag">{genre}</h5>
          ))}
          <h6 className="lang-tag">{movie.language}</h6>
        </div>
        <h4>Overview</h4>
        <h5 style={{ fontSize: "1rem" }}>{movie.overview}</h5>
      </div>
      <button className="movie-details-close-btn" onClick={onClose}>
        <IoClose size="30px" />
      </button>
    </div>
  );
}

export default MovieDetails;
