import * as FaIcons from "react-icons/fa6";
import styles from "../Post/PostToolbar/PostToolbar.module.scss";
import iconStyle from "../ButtonGroup/ButtonGroup.module.scss";
import { IUser } from "../../services/Types";

export const PostFilters = [
  {
    label: "Top Rated",
    onClick: () => null,
    cName: styles.postFilterBtn,
    icon: <FaIcons.FaStar className={iconStyle.filterIcon} />,
  },
  {
    label: "Recent",
    onClick: () => null,
    cName: styles.postFilterBtn,
    icon: <FaIcons.FaNewspaper className={iconStyle.filterIcon} />,
  },
  {
    label: "Most Commented",
    onClick: () => null,
    cName: styles.postFilterBtn,
    icon: <FaIcons.FaComment className={iconStyle.filterIcon} />,
  },
];

export const profile: IUser = {
  fullName: "Aviv Cohen",
  email: "cohenaviv2@gmail.com",
  password: "$2b$10$zg9vYzrEVTilsEqnSAgSxOsOy/3pfop5b44yO/bXjN9bMya5rVNPS",
  imageUrl: "https://lh3.googleusercontent.com/a/ACg8ocJKbiKtusYhGOf7LYTk1Qy2Ho62Wle8xMCVyBaIHREp=s96-c",
  role: "user",
  googleId: "111355991550932592226",
  tokens:[],
};
