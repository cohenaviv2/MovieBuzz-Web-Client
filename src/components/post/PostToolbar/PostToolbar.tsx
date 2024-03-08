import { PostFilters } from "../PostsData";
import styles from "./PostToolbar.module.scss";
import { PostFilter } from "../../../services/PostService";
import { createButton } from "../../ButtonGroup/ButtonUtils";
import Spinner from "../../Spinner/Spinner";

interface PostToolbarProps {
  handleFilterSelection: (value: PostFilter) => void;
  selectedFilter:PostFilter;
  loading: boolean;
}

function PostToolbar({ loading,selectedFilter, handleFilterSelection }: PostToolbarProps) {

  const filterButtons = PostFilters.map((filter) => {
    const isSelected = selectedFilter === filter.path;
    const buttonClassName = isSelected ? styles.filterBtnSelected : styles.filterBtn;
    return createButton(filter.label, () => handleFilterSelection(filter.path as PostFilter), buttonClassName, filter.path, filter.icon);
  });

  return (
    <div className={styles.postToolbar}>
      <div className={styles.spinnerContainer}>{loading && <Spinner />}</div>
      <div className={styles.filterBtnContainer}>
        {filterButtons.map((button, index) => (
          <button className={button.cName} onClick={button.onClick} key={index}>
            {button.icon}
            {/* {button.label} */}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PostToolbar;
