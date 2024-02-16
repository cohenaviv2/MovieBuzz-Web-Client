import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IMovie, ITvShow } from "../../../services/Types";
import { MoviesData, genres } from "../../Movie/MoviesData";
import { TvShowsData } from "../../Movie/TvShowsData"
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { BsFillPostcardFill } from "react-icons/bs";
import styles from "./MovieDetails.module.scss";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovie | ITvShow>();
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  useEffect(() => {
    if (currentPath.startsWith("/movie")) {
      const selectedMovie = MoviesData.find((movie) => movie.id === parseInt(id as string));
      setMovie(selectedMovie);
    } else if (currentPath.startsWith("/tv")) {
      const selectedTvShow = TvShowsData.find((show) => show.id === parseInt(id as string));
      setMovie(selectedTvShow);
    }
  }, [id, currentPath]);
  

  const genreList = movie?.genre_ids.map((genreId) => genres.find((genre) => genre.id === genreId)!.name);

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
            <h1>{movie?.title}</h1>
            <h2 className={styles.yearTag}>{movie?.year}</h2>
          </div>
          <div className={styles.tagsContainer}>
            {genreList?.map((genre, index) => (
              <h5 key={index} className={styles.genreTag}>
                {genre}
              </h5>
            ))}
            <h5 className={styles.langTag}>{movie?.language}</h5>
          </div>
          <div className={styles.overviewContainer}>
            <h3>Overview</h3>
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
