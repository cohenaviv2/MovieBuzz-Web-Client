import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IMovie, IMovieDetails, ITvShow } from "../../../services/Types";
import { MoviesData, genres } from "../../Movie/MoviesData";
import { TvShowsData } from "../../Movie/TvShowsData";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { BsFillPostcardFill } from "react-icons/bs";
import styles from "./MovieDetails.module.scss";
import MovieService, { CanceledError } from "../../../services/MovieService";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovieDetails | ITvShow>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  useEffect(() => {
    setIsLoading(true);
    if (currentPath.startsWith("/movie")) {
      // const selectedMovie = MoviesData.find((movie) => movie.id === parseInt(id as string));
      // setMovie(selectedMovie);
      const { request, cancel } = MovieService.getMovieById(parseInt(id!));
      request
        .then((res) => {
          console.log(res.data);
          const movie = res.data as IMovie;
          setMovie(movie);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err instanceof CanceledError) return;
          console.log("Fetch: " + err);
          setError(err);
        });
      return () => cancel();
    } else if (currentPath.startsWith("/tv")) {
      // const selectedTvShow = TvShowsData.find((show) => show.id === parseInt(id as string));
      // setMovie(selectedTvShow);
    }
  }, [id, currentPath]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="movie">
      <div className={styles.detailsCard}>
        <div className={styles.imgContainer}>
          <img src={movie?.poster_path} alt={movie?.title} />
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.titleContainer}>
            <h2>{movie?.title}</h2>
            <h2 className={styles.yearTag}>{movie?.year}</h2>
          </div>
          <div className={styles.tagsContainer}>
            {movie?.genre_ids.map((genre, index) => (
              <h5 key={index} className={styles.genreTag}>
                {genre}
              </h5>
            ))}
            <h5 className={styles.langTag}>{movie?.language}</h5>
          </div>
          <div className={styles.overviewContainer}>
            {/* <h3>Overview</h3> */}
            <h6>{movie?.overview}</h6>
          </div>
          <div className={styles.buttonsContainer}>
            <button className={styles.getPostsBtn} onClick={handleGoBack}>
              <BsFillPostcardFill className={styles.postIcon} />
              Show Posts
            </button>
            <label>You can see posts related to this content</label>
            <button className={styles.newPostBtn} onClick={handleGoBack}>
              <FaPlus />
              Create Post
            </button>
            <label>You can create post about this content</label>
          </div>
        </div>
        <div className={styles.closeBtnContainer}>
          <button className={styles.closeBtn} onClick={handleGoBack}>
            <IoClose />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
