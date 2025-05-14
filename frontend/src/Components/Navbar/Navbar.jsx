//Nav.css import .............
import "./Navbar.css";

//router link  import .............
import { Link, NavLink } from "react-router-dom";

//logo import .............
import Logo from "../Assets/logo.png";

//Navdata import .............
import { navLinks, navRight } from "../../Data/Data";

//menu item import .............
import { VscMenu } from "react-icons/vsc";
import { GrClose } from "react-icons/gr";

//use state  import .............
import { useState } from "react";
export default function Navbar() {
  // use state for navlinks show and hide feature.................
  const [isNavLinksShowing, setIsnavLinkShowing] = useState(false);
  // window scroll  navlinks .................
  if (window.innerWidth < 1024) {
    window.addEventListener("scroll", () => {
      document.querySelector(".nav-links").classList.add("navLinksHide");
      setIsnavLinkShowing(false);
    });
  }
  window.addEventListener("scroll", () => {
    document
      .querySelector("nav")
      .classList.toggle("navShadow", window.scrollY > 0);
  });
  return (
    <nav className="Navbar">
      <div className="container  nav-container">
        {/*.......logo.........*/}
        <Link to={"/"} className="logo">
          <img src={Logo} alt="Logo" />
        </Link>
        {/*.......Nva-links.........*/}

        <ul
          className={`nav-links ${
            isNavLinksShowing ? "navLinksShow" : "navLinksHide"
          }`}
        >
          {navLinks.map(({ name, path }, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active " : "")}
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/*.......Nva-right.........*/}
        <div className="nav-right">
          {navRight.managements.map((item, index) => {
            return (
              <Link
                key={index}
                // target="_blank"
                className="management-icons "
                to={item.link}
              >
                <item.icon />
              </Link>
            );
          })}
          <button
            className="menu-button"
            onClick={() => setIsnavLinkShowing(!isNavLinksShowing)}
          >
            {!isNavLinksShowing ? <VscMenu /> : <GrClose />}
          </button>
        </div>
      </div>
    </nav>
  );
}
