import SearchBar from "../components/SearchBar";

function Search() {
  const handleSearch = (term: string) => {
    console.log(term);
  };

  return (
    <div className="search">
      <h1>Search</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default Search;
