import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { NavbarData } from "./NavbarData";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <IconContext.Provider
      value={{ color: "#f5f5f5", size: "30px", className: "nav-icon" }}
    >
      <nav className="navbar">
        <ul className="navbar-list">
          {NavbarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path} className="nav-link">
                  {item.icon}
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
