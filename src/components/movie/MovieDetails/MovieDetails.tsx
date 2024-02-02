import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IMovie, ITvShow } from "../../../services/CommonTypes";
import { MovieGenres, MoviesData } from "../MoviesData";
import { TvShowsData } from "../TvShowsData";
import { IoClose } from "react-icons/io5";
import styles from "./MovieDetails.module.scss"

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
    <div className={styles.movie} style={{justifyContent:"center"}}>
      <div className={styles.movieDetailsCard}>
        <img src={movie?.poster_path} className={styles.movieDetailsImg}></img>
        <div className={styles.detailsContaimer}>
          <div className={styles.titleContainer}>
            <h2>{movie?.title}</h2>
            <h5 className={styles.yearTag}>{movie?.year}</h5>
          </div>
          <div className={styles.tagsContainer}>
            {genres?.map((genre, index) => (
              <h5 key={index} className={styles.genreTag}>
                {genre}
              </h5>
            ))}
            <h6 className={styles.langTag}>{movie?.language}</h6>
          </div>
          <h4>Overview</h4>
          <div className={styles.overview}>{movie?.overview}</div>
        </div>
        <button className={styles.movieDetailsBtn} onClick={handleGoBack}>
          <IoClose size="30px" />
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
