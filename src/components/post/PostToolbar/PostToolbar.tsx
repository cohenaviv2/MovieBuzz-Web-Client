import { FaPlus } from "react-icons/fa";
import ButtonGroup, {Button} from "../../ButtonGroup/ButtonGroup";
import { PostFilters } from "../PostsData";
import { Link } from "react-router-dom";
import styles from "./PostToolbar.module.scss"

function PostToolbar() {
  function createButton(
    label: string,
    onClick: () => void,
    cName: string
  ): Button {
    return {
      label,
      onClick,
      cName,
    };
  }

  function handleFilterClick(filter: string) {
    console.log(filter);
  }

  const filterButtons = PostFilters.map((filter) => createButton(filter.label,()=>handleFilterClick(filter.label),filter.cName));

  return (
    <div className={styles.postToolbar}>
      <h1 style={{ fontSize: "3rem" }}>Home</h1>
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
