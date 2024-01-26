import { useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/movie/MovieCard";
import SearchBar from "../components/SearchBar";
import List from "../components/List";
import { IMovie, IPost, ITvShow } from "../services/CommonTypes";
import {
  frozenMovieSearchRes,
  frozenPostsSearchRes,
  frozenTvSeachRes,
} from "../components/movie/MoviesData";
import "../styles/Search.css";
import PostCard from "../components/post/PostCard";

function Search() {
  const [searchTerm, setSearchTerms] = useState(false);
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const [tvShowList, setTvShowList] = useState<ITvShow[]>([]);
  const [postList, setPostList] = useState<IPost[]>([]);

  const handleSearch = (term: string) => {
    console.log(term);
    setMovieList(frozenMovieSearchRes);
    setTvShowList(frozenTvSeachRes);
    setPostList(frozenPostsSearchRes);
    setSearchTerms(true);
  };

  return (
    <div className="search">
      {!searchTerm && <h1>Search</h1>}
      <SearchBar onSearch={handleSearch} />
      {searchTerm && (
        <div className="search-res">
          Posts
          <List
            items={postList}
            renderItem={(post) => (
              <Link to={`/post/${post._id}`} key={post._id}>
                <PostCard post={post} />
              </Link>
            )}
          />
          Movies
          <List
            items={movieList}
            renderItem={(movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie} />
              </Link>
            )}
          />
          TV Shows
          <List
            items={tvShowList}
            renderItem={(tvShow) => (
              <Link to={`/tv/${tvShow.id}`} key={tvShow.id}>
                <MovieCard movie={tvShow} />
              </Link>
            )}
          />
        </div>
      )}
    </div>
  );
}

export default Search;
