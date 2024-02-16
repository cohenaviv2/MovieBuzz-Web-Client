import { useState } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { NavbarData } from "./NavbarData";
import styles from "./Navbar.module.scss";

function Navbar() {
  const [selectedPath, setSelectedPath] = useState("Home");

  const handlePathClick = (path: string) => {
    setSelectedPath(path);
  };

  return (
    <IconContext.Provider value={{ className: styles.navIcon }}>
      <nav className={styles.navbar}>
        <ul className={styles.navbarList}>
          {NavbarData.map((item, index) => {
            return (
              <li key={index} className={item.cName} onClick={() => handlePathClick(item.title)}>
                <Link to={item.path} className={styles.navLink}>
                  {item.title == selectedPath ? item.selectedIcon : item.icon}
                  <span className={item.cNameTxt}>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Navbar;
