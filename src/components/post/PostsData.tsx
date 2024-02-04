import * as FaIcons from "react-icons/fa6";
import styles from "../Post/PostToolbar/PostToolbar.module.scss";

// const logoBg = "#FFCF37";
const iconSize = 20;

export const PostFilters = [
  {
    label: "Top Rated",
    onClick: () => null,
    cName: styles.postFilterBtn,
    icon: <FaIcons.FaStar size={iconSize} />,
  },
  {
    label: "Recent",
    onClick: () => null,
    cName: styles.postFilterBtn,
    icon: <FaIcons.FaNewspaper size={iconSize} />,
  },
  {
    label: "Most Commented",
    onClick: () => null,
    cName: styles.postFilterBtn,
    icon: <FaIcons.FaComment size={iconSize} />,
  },
];
