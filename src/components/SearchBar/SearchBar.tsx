import { useState, ChangeEvent, FormEvent } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [submited, setSubmited] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm != "") {
      setSubmited(true);
      onSearch(searchTerm);
    }
  };

  return (
    <form className={styles.searchBar} style={{ height: submited ? "3rem" : "6rem" }} onSubmit={handleSubmit}>
      <h4>Search</h4>
      <input className={styles.searchInput} type="text" placeholder="Movies, TV Shows, Posts..." value={searchTerm} onChange={handleInputChange} />
      <button className={styles.searchBtn} type="submit">
        <PiMagnifyingGlassBold size="25px" />
      </button>
    </form>
  );
}

export default SearchBar;
