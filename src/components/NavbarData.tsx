import * as BiIcons from "react-icons/bi";
import * as PiIcons from "react-icons/pi";

export const NavbarData = [
  {
    title: "Sign In",
    path: "/profile",
    icon: <BiIcons.BiSolidUserCircle />,
    cName: "nav-item",
    cNameTxt: "nav-text",
  },
  {
    title: "Home",
    path: "/",
    icon: <PiIcons.PiHouseFill />,
    cName: "nav-item",
    cNameTxt: "nav-text",
  },
  {
    title: "Search",
    path: "/search",
    icon: <PiIcons.PiMagnifyingGlassBold />,
    cName: "nav-item",
    cNameTxt: "nav-text",
  },
  {
    title: "Movies",
    path: "/movies",
    icon: <PiIcons.PiFilmSlateBold />,
    cName: "nav-item",
    cNameTxt: "nav-text",
  },
  {
    title: "TV Shows",
    path: "/tv",
    icon: <PiIcons.PiTelevisionSimpleBold />,
    cName: "nav-item",
    cNameTxt: "nav-text",
  },
  {
    title: "Chat",
    path: "/chat",
    icon: <PiIcons.PiChatCircleTextFill />,
    cName: "nav-item",
    cNameTxt: "nav-text",
  },
];
