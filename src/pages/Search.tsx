import { useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/Movie/MovieCard/MovieCard.tsx";
import SearchBar from "../components/SearchBar/SearchBar.tsx";
import List from "../components/List/List.tsx";
import { IMovie, IPost, ITvShow } from "../services/CommonTypes";
import {
  frozenMovieSearchRes,
  frozenPostsSearchRes,
  frozenTvSeachRes,
} from "../components/Movie/MoviesData.tsx";
import "../styles/Search.css";
import PostCard from "../components/Post/PostCard/PostCard.tsx";

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
      {/* {!searchTerm && <h1>Search</h1>} */}
      <SearchBar onSearch={handleSearch} />
      {searchTerm && (
        <div className="search-res">
          Movies
          <List
            type="movie"
            items={movieList}
            renderItem={(movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie} />
              </Link>
            )}
          />
          TV Shows
          <List
            type="movie"
            items={tvShowList}
            renderItem={(tvShow) => (
              <Link to={`/tv/${tvShow.id}`} key={tvShow.id}>
                <MovieCard movie={tvShow} />
              </Link>
            )}
          />
          Posts
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
