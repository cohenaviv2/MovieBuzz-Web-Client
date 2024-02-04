import { FaPlus } from "react-icons/fa";
import ButtonGroup from "../../ButtonGroup/ButtonGroup";
import { Button } from "../../ButtonGroup/ButtonData";
import { PostFilters } from "../PostsData";
import { Link } from "react-router-dom";
import styles from "./PostToolbar.module.scss";

function PostToolbar() {
  function createButton(label: string, onClick: () => void, cName: string, icon:JSX.Element): Button {
    return {
      label,
      onClick,
      cName,
      icon,
    };
  }

  function handleFilterClick(filter: string) {
    console.log(filter);
  }

  const filterButtons = PostFilters.map((filter) => createButton(filter.label, () => handleFilterClick(filter.label), filter.cName,filter.icon));

  return (
    <div className={styles.postToolbar}>
      <h3>Home</h3>
      <ButtonGroup buttons={filterButtons} type="filter" />
      <Link to="/search">
        <button className={styles.newPostBtn}>
          <FaPlus size="20px" />
          New Post
        </button>
      </Link>
    </div>
  );
}

export default PostToolbar;
