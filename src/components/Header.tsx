import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/Header.css";

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img className="header-img" src={logo} alt="logo" />
      </Link>
    </div>
  );
}

export default Header;
