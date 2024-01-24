import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IMovie, ITvShow } from "../../services/CommonTypes";
import { MovieGenres, MoviesData } from "./MoviesData";
import { IoClose } from "react-icons/io5";
import "../../styles/movie/MovieDetails.css";
import { TvShowsData } from "./TvShowsData";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovie | ITvShow | null>();
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  useEffect(() => {
    if (currentPath.startsWith("/movie")) {
        const selectedMovie = MoviesData.find(
          (movie) => movie.id === parseInt(id as string)
        );
        setMovie(selectedMovie);
    } else if (currentPath.startsWith("/tv")) {
      const selectedTvShow = TvShowsData.find(
        (show) => show.id === parseInt(id as string)
      );
      setMovie(selectedTvShow);
    }
  }, [id, currentPath]);

  const genres = movie?.genre_ids.map(
    (genre_id) => MovieGenres.find((item) => item.id === genre_id)?.name
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="movie" style={{justifyContent:"center"}}>
      <div className="movie-details-card">
        <img src={movie?.poster_path} className="movie-details-img"></img>
        <div className="details-container">
          <div className="title-container">
            <h2>{movie?.title}</h2>
            <h5 className="year-tag">{movie?.year}</h5>
          </div>
          <div className="tags-container">
            {genres?.map((genre, index) => (
              <h5 key={index} className="genre-tag">
                {genre}
              </h5>
            ))}
            <h6 className="lang-tag">{movie?.language}</h6>
          </div>
          <h4>Overview</h4>
          <div className="overview">{movie?.overview}</div>
        </div>
        <button className="movie-details-button" onClick={handleGoBack}>
          <IoClose size="30px" />
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
