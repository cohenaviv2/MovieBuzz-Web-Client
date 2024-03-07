import { Link } from "react-router-dom";
import ButtonGroup from "../../ButtonGroup/ButtonGroup";
import { Button } from "../../ButtonGroup/ButtonUtils";
import { PostFilters } from "../PostsData";
import { FaPlus } from "react-icons/fa";
import { GiFallingStar } from "react-icons/gi";
import styles from "./PostToolbar.module.scss";
import { DiVim } from "react-icons/di";

function PostToolbar() {
  function createButton(label: string, onClick: () => void, cName: string, icon: JSX.Element): Button {
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

  const filterButtons = PostFilters.map((filter) => createButton(filter.label, () => handleFilterClick(filter.label), filter.cName, filter.icon));

  return (
    <div className={styles.postToolbar}>
      {/* <h3>Home</h3>
      <div className={styles.textContainer}>
        <GiFallingStar />
        Explore user-rated movies & TV posts
      </div> */}
      <div className={styles.filterBtnContainer}>
        {filterButtons.map((button) => (
          <button className={button.cName} onClick={button.onClick}>
            {button.icon}
            {button.label}
          </button>
        ))}
      </div>
      {/* <ButtonGroup buttons={filterButtons} type="filter" /> */}
      {/* <Link to="/search">
        <button className={styles.newPostBtn}>
          <FaPlus size="20px" />
          New Post
        </button>
      </Link> */}
    </div>
  );
}

export default PostToolbar;
