import { useState, ChangeEvent, FormEvent } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import "../styles/SearchBar.css";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
        className="search-input"
          type="text"
          placeholder="Movies, TV Shows, Posts..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <button className="search-btn" type="submit">
        <PiMagnifyingGlassBold size="25px" />
      </button>
    </form>
  );
}

export default SearchBar;
