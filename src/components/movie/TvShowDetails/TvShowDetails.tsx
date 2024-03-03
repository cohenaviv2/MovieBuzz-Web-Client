import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { BsFillPostcardFill } from "react-icons/bs";
import styles from "./TvShowDetails.module.scss";
import useMovieDetails from "../../../hooks/useMovieDetails";
import Error from "../../Error/Error";
import Spinner from "../../Spinner/Spinner";
import { ITvShowDetails } from "../../../services/Types";

function TvShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const tvShowId = id!.trim();

  // Use the custom hook for TV show details
  const { movieDetails, isLoading, error } = useMovieDetails<ITvShowDetails>(tvShowId, currentPath);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="movie">
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Error error={error} />
      ) : (
        movieDetails && (
          <>
            {/* Assuming there's a backdrop image for TV shows as well */}
            <div className={styles.backdropImage} style={{ backgroundImage: `url(${movieDetails.backdrop_path})` }} />
            <div className={styles.detailsCard}>
              {/* Customize the content based on TV show details */}
              <div className={styles.imgContainer}>
                <img src={movieDetails.poster_path} alt={movieDetails.title} />
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
                  <button className={styles.newPostBtn} onClick={handleGoBack}>
                    <FaPlus />
                    Create Post
                  </button>
                  <label>You can create post about this content</label>
                  <button className={styles.getPostsBtn} onClick={handleGoBack}>
                    <BsFillPostcardFill className={styles.postIcon} />
                    Show Posts
                  </button>
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