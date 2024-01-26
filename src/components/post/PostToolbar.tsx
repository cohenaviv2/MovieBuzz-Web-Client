import { FaPlus } from "react-icons/fa";
import "../../styles/post/PostToolbar.css";
import ButtonGroup, { Button } from "../ButtonGroup";
import { PostFilters } from "./PostsData";

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

  const filterButtons = PostFilters.map((filter) =>
    createButton(filter, () => handleFilterClick(filter), "post-filter-btn")
  );

  return (
    <div className="post-toolbar">
      <h1 style={{fontSize:"3rem"}}>Home</h1>
      <ButtonGroup buttons={filterButtons} type="filter" />
      <button className="new-post-btn">
        <FaPlus size="20px" />
        New Post
      </button>
    </div>
  );
}

export default PostToolbar;
