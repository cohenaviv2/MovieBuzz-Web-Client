import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/Movie/MovieCard/MovieCard";
import SearchBar from "../components/SearchBar/SearchBar";
import List from "../components/List/List";
import { IMovie, IPost, ITvShow } from "../services/Types";
import { frozenMovieSearchRes, frozenPostsSearchRes, frozenTvSeachRes } from "../components/Movie/MoviesData";
import PostCard from "../components/Post/PostCard/PostCard";
import styles from "../components/SearchBar/SearchBar.module.scss";
import MovieService, { CanceledError } from "../services/MovieService";
import TvShowsService from "../services/TvShowsService";

function Search() {
  const [isSearchTerm, setIsSearchTerms] = useState(false);
  const [query, setQuery] = useState("");
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const [tvShowList, setTvShowList] = useState<ITvShow[]>([]);
  const [postList, setPostList] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (query !== "") {
      setIsLoading(true);
      searchMovies();
      searchTvShows();
      setIsLoading(false);
    }
  }, [query]);

  const handleSearch = (query: string) => {
    if (query != "") {
      console.log(query);
      setQuery(query);
      setIsSearchTerms(true);
    }
  };

  function searchMovies() {
    const { request, cancel } = MovieService.searchMovies(query);
    request
      .then((res) => {
        setMovieList(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err instanceof CanceledError) return;
        setError(err);
        console.log(err);
      });

    return () => cancel();
  }

  function searchTvShows() {
    const { request, cancel } = TvShowsService.searchTvShows(query);
    request
      .then((res) => {
        setTvShowList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err instanceof CanceledError) return;
        setError(err);
        console.log(err);
      });

    return () => cancel();
  }

  return (
    <div className="search">
      <SearchBar onSearch={handleSearch} />
      {isSearchTerm && (
        <div className={styles.searchRes}>
          <h2>Movies</h2>
          <List
            type="movie"
            items={movieList}
            renderItem={(movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie} isLoading={isLoading} />
              </Link>
            )}
          />
          <h2>TV Shows</h2>
          <List
            type="movie"
            items={tvShowList}
            renderItem={(tvShow) => (
              <Link to={`/tv/${tvShow.id}`} key={tvShow.id}>
                <MovieCard movie={tvShow} isLoading={isLoading} />
              </Link>
            )}
          />
          <h2>Posts</h2>
          <List
            type="post"
            items={postList}
            renderItem={(post) => (
              <Link to={`/post/${post._id}`} key={post._id}>
                <PostCard post={post} />
              </Link>
            )}
          />
        </div>
      )}
    </div>
  );
}

export default Search;
