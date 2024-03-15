import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { NavbarData } from "./NavbarData";
import styles from "./Navbar.module.scss";
import ProfileIcon from "./NavbarData";
import { IAuth } from "../../services/Types";

interface NavbarProps {
  auth:IAuth|null;
}


function Navbar({auth}:NavbarProps) {
  const loaction = useLocation();
  const [selectedPath, setSelectedPath] = useState(loaction.pathname);

  const handlePathClick = (path: string) => {
    setSelectedPath(path);
  };

  const navbarItems = NavbarData.map((item, index) => {
    if (index === 0 && auth) {
      return {
        ...item,
        path: "/profile",
        title: auth.user.fullName,
        icon: ProfileIcon(auth.user.imageUrl),
        selectedIcon: ProfileIcon(auth.user.imageUrl),
      };
    } else {
      return item;
    }
  });

  return (
    <IconContext.Provider value={{ className: styles.navIcon }}>
      <nav className={styles.navbar}>
        <ul className={styles.navbarList}>
          {navbarItems.map((item, index) => (
            <li key={index} className={item.cName} onClick={() => handlePathClick(item.path)}>
              <Link to={item.path} className={(index == 0 && auth) ? styles.navLinkFirst:styles.navLink}>
                {item.path === selectedPath ? item.selectedIcon : item.icon}
                <span className={item.cNameTxt}>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Navbar;
