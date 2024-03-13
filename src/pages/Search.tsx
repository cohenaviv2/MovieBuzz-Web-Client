import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/Movie/MovieCard/MovieCard";
import SearchBar from "../components/SearchBar/SearchBar";
import List from "../components/List/List";
import { IMovie, IPost, ITvShow } from "../services/Types";
import PostCard from "../components/Post/PostCard/PostCard";
import styles from "../components/SearchBar/SearchBar.module.scss";
import { moviesService, tvShowsService, CanceledError } from "../services/MovieService";
import Spinner from "../components/Spinner/Spinner";
import Error from "../components/Error/Error";
import PostService, { AxiosError } from "../services/PostService";

function Search() {
  const [isSearchTerm, setIsSearchTerms] = useState(false);
  const [query, setQuery] = useState("");
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const [tvShowList, setTvShowList] = useState<ITvShow[]>([]);
  const [postList, setPostList] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [moviesError, setMoviesError] = useState<AxiosError | null>(null);
  const [tvError, setTvError] = useState<AxiosError | null>(null);
  const [postsError, setPostsError] = useState<AxiosError | null>(null);

  useEffect(() => {
    if (query !== "") {
      setLoading(true);
      searchMovies();
      searchTvShows();
      searchPosts();
      setLoading(false);
    }
  }, [query]);

  const handleSearch = (query: string) => {
    if (query != "") {
      setMoviesError(null);
      setTvError(null);
      setPostsError(null);
      setQuery(query);
      setIsSearchTerms(true);
    }
  };

  function searchMovies() {
    const { request, cancel } = moviesService.search(query);
    request
      .then((res) => {
        setMovieList(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof CanceledError) return;
        setMoviesError(err);
        console.log(err);
        setLoading(false);
      });

    return () => cancel();
  }

  function searchTvShows() {
    const { request, cancel } = tvShowsService.search(query);
    request
      .then((res) => {
        setTvShowList(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setTvError(err);
        console.log(err);
        setLoading(false);
      });

    return () => cancel();
  }

  function searchPosts() {
    const { request, cancel } = PostService.searchPosts(query);
    request
      .then((res) => {
        console.log(res.data);
        setPostList(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setPostsError(err);
        console.log(err);
        // setLoading(false);
      });

    return () => cancel();
  }

  return (
    <div className="search">
      <SearchBar onSearch={handleSearch} />
      {isSearchTerm && (
        <div className={styles.searchRes}>
          <h2>Movies</h2>
          <div className={styles.resContainer}>
            {loading ? (
              <Spinner />
            ) : moviesError ? (
              <Error message={moviesError.response ? (moviesError.response.data as string) : moviesError.message} />
            ) : (
              <List
                type="movie"
                items={movieList}
                renderItem={(movie) => (
                  <Link to={`/movie/${movie.id}`} key={movie.id}>
                    <MovieCard movie={movie} />
                  </Link>
                )}
              />
            )}
          </div>
          <h2>TV Shows</h2>
          <div className={styles.resContainer}>
            {loading ? (
              <Spinner />
            ) : tvError ? (
              <Error message={tvError.response ? (tvError.response.data as string) : tvError.message} />
            ) : (
              <List
                type="movie"
                items={tvShowList}
                renderItem={(tvShow) => (
                  <Link to={`/tv/${tvShow.id}`} key={tvShow.id}>
                    <MovieCard movie={tvShow} />
                  </Link>
                )}
              />
            )}
          </div>
          <h2>Posts</h2>
          <div className={styles.resContainer}>
            {loading ? (
              <Spinner />
            ) : postsError ? (
              <Error message={postsError.response ? (postsError.response.data as string) : postsError.message} />
            ) : (
              <List
                type="post"
                items={postList}
                renderItem={(post) => (
                  <Link to={`/post/${post._id}`} key={post._id}>
                    <PostCard post={post} />
                  </Link>
                )}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
