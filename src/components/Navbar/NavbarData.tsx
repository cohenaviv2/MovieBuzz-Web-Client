// import * as BiIcons from "react-icons/bi";
import * as PiIcons from "react-icons/pi";
import styles from "./Navbar.module.scss"

export const NavbarData = [
  {
    title: "Login",
    path: "/login",
    icon: <PiIcons.PiUserBold />,
    selectedIcon: <PiIcons.PiUserFill />,
    cName: styles.navItem,
    cNameTxt: styles.navText,
  },
  {
    title: "Home",
    path: "/",
    icon: <PiIcons.PiHouseBold />,
    selectedIcon: <PiIcons.PiHouseFill />,
    cName: styles.navItem,
    cNameTxt: styles.navText,
  },
  {
    title: "Search",
    path: "/search",
    icon: <PiIcons.PiListMagnifyingGlassBold />,
    selectedIcon: <PiIcons.PiListMagnifyingGlassFill />,
    cName: styles.navItem,
    cNameTxt: styles.navText,
  },
  {
    title: "Movies",
    path: "/movies",
    icon: <PiIcons.PiVideoCameraBold />,
    selectedIcon: <PiIcons.PiVideoCameraFill />,
    cName: styles.navItem,
    cNameTxt: styles.navText,
  },
  {
    title: "TV Shows",
    path: "/tv",
    icon: <PiIcons.PiTelevisionSimpleBold />,
    selectedIcon: <PiIcons.PiTelevisionSimpleFill />,
    cName: styles.navItem,
    cNameTxt: styles.navText,
  },
  {
    title: "Chat",
    path: "/chat",
    icon: <PiIcons.PiChatCircleTextBold />,
    selectedIcon: <PiIcons.PiChatCircleTextFill />,
    cName: styles.navItem,
    cNameTxt: styles.navText,
  },
];

const ProfileIcon = (imageUrl: string) => {
  return <img src={imageUrl} alt="Profile" className={styles.profileIcon} />;
};

export default ProfileIcon;