import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { NavbarData } from "./NavbarData";
import styles from "./Navbar.module.scss";
import ProfileIcon from "./NavbarData";
import { IUser } from "../../services/Types";

interface NavbarProps {
  profile:IUser|null;
}

function Navbar({ profile }: NavbarProps) {
  const [selectedPath, setSelectedPath] = useState("Home");

  const handlePathClick = (path: string) => {
    setSelectedPath(path);
  };

  const navbarItems = NavbarData.map((item, index) => {
    if (index === 0 && profile != null) {
      return {
        ...item,
        title: profile.fullName,
        icon: ProfileIcon(profile.imageUrl),
        selectedIcon: ProfileIcon(profile.imageUrl),
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
            <li key={index} className={item.cName} onClick={() => handlePathClick(item.title)}>
              <Link to={item.path} className={styles.navLink}>
                {item.title === selectedPath ? item.selectedIcon : item.icon}
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
