import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { BsFillPostcardFill } from "react-icons/bs";
import styles from "./TvShowDetails.module.scss";
import useMovieDetails from "../../../hooks/useMovieDetails";
import Error from "../../Error/Error";
import Spinner from "../../Spinner/Spinner";
import { ITvShowDetails } from "../../../services/Types";
import { TMDB_NULL_IMG_URL } from "../MovieCard/MovieCard";
import noImageAvailable from "../../../assets/no-img-availbale.png";

function TvShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const tvShowId = id!.trim();

  // Use the custom hook for TV show details
  const { movieDetails, loading, error } = useMovieDetails<ITvShowDetails>(tvShowId, currentPath);

  const handleGoBack = () => {
    navigate("/tv");
  };

  return (
    <div className="movie">
      {loading ? (
        <Spinner />
      ) : error ? (
        <Error message={error.message} />
      ) : (
        movieDetails && (
          <>
            {/* Assuming there's a backdrop image for TV shows as well */}
            <div className={styles.backdropImage} style={{ backgroundImage: `url(${movieDetails.backdrop_path})` }} />
            <div className={styles.detailsCard}>
              {/* Customize the content based on TV show details */}
              <div className={styles.imgContainer}>
                <img src={movieDetails.poster_path === TMDB_NULL_IMG_URL ? noImageAvailable : movieDetails.poster_path} alt={movieDetails.title} />
              </div>
              <div className={styles.detailsContainer}>
                <div className={styles.titleContainer}>
                  <h1>{movieDetails.title}</h1>
                  <h2 className={styles.yearTag}>{movieDetails.year}</h2>
                </div>
                <div className={styles.tagsContainer}>
                  {movieDetails.genre_ids &&
                    movieDetails.genre_ids.map((genre, index) => (
                      <h5 key={index} className={styles.genreTag}>
                        {genre}
                      </h5>
                    ))}
                  <h5 className={styles.langTag}>{movieDetails.language}</h5>
                </div>
                <div className={styles.overviewContainer}>
                  <h3>Overview</h3>
                  <h6>{movieDetails.overview}</h6>
                </div>
                <div className={styles.buttonsContainer}>
                  <Link to={`/new-post`} state={{ movieDetails }}>
                    <button className={styles.newPostBtn}>
                      <FaPlus />
                      Create Post
                    </button>
                  </Link>
                  <label>You can create post about this content</label>
                  <Link to={`/tv/${tvShowId}/posts`} state={{ movieDetails }}>
                    <button className={styles.getPostsBtn}>
                      <BsFillPostcardFill className={styles.postIcon} />
                      View Posts
                    </button>
                  </Link>
                  <label>You can see posts related to this content</label>
                </div>
              </div>
              <div className={styles.closeBtnContainer}>
                <button className={styles.closeBtn} onClick={handleGoBack}>
                  <IoClose />
                </button>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default TvShowDetails;
