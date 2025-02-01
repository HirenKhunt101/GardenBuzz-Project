import { useState } from "react";
// import {Helmet} from "react-helmet";
import "./navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { UserData } from "../SystemSetup/UserData";
const user_data = new UserData();
import { useNavigate } from "react-router-dom";

import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    // setActiveLink(link);
    if (link == "Logout") {
      // localStorage.clear();
      // sessionStorage.clear();
      console.log("adsfaf", navigate);
      navigate("/login");
    }
  };

  return (
    <>
      {/* <script src="/Controllers/main.js" type="text/javascript" /> */}
      <header className="header" id="header">
        <nav className="nav container">
          <img
            src={require("./../ProductImages/logo.png")}
            alt=""
            className="logo_img"
          />
          <a href="#" className="nav__logo">
            <i className="ri-leaf-line nav__logo-icon"></i> Garden Buzz
          </a>

          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a
                  href="/"
                  className={`nav__link ${
                    activeLink === "Home" ? "active-link" : ""
                  }`}
                  onClick={() => handleLinkClick("Home")}
                >
                  Home
                </a>
              </li>
              <li className="nav__item">
                <Link
                  to="/Product/plant"
                  className={`nav__link ${
                    activeLink === "Plant" ? "active-link" : ""
                  }`}
                  onClick={() => handleLinkClick("Plant")}
                >
                  Plant
                </Link>
              </li>

              <li className="nav__item">
                <Link
                  to="/Product/flower"
                  className={`nav__link ${
                    activeLink === "Flower" ? "active-link" : ""
                  }`}
                  onClick={() => handleLinkClick("Flower")}
                >
                  Flower
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="/Product/vine"
                  className={`nav__link ${
                    activeLink === "Vine" ? "active-link" : ""
                  }`}
                  onClick={() => handleLinkClick("Vine")}
                >
                  Vine
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="/Product/plantcare"
                  className={`nav__link ${
                    activeLink === "Plant Care" ? "active-link" : ""
                  }`}
                  onClick={() => handleLinkClick("Plant Care")}
                >
                  Plant Care
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="/Product/fertilizer"
                  className={`nav__link ${
                    activeLink === "Fertilizer" ? "active-link" : ""
                  }`}
                  onClick={() => handleLinkClick("Fertilizer")}
                >
                  Fertilizer
                </Link>
              </li>
              {/* <li className="nav__item">
                <a
                  href="/"
                  className={`nav__link ${
                    activeLink === "About" ? "active-link" : ""
                  }`}
                  onClick={() => handleLinkClick("About")}
                >
                  About
                </a>
              </li> */}
              {/* <li className="nav__item">
                <a
                  href="#faqs"
                  className={`nav__link ${
                    activeLink === "FAQs" ? "active-link" : ""
                  }`}
                  onClick={() => handleLinkClick("FAQs")}
                >
                  FAQs
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#contact"
                  className={`nav__link ${
                    activeLink === "Contact" ? "active-link" : ""
                  }`}
                  onClick={() => handleLinkClick("Contact")}
                >
                  Contact Us
                </a>
              </li> */}
              <li className="nav__item">
                <Link
                  to="/Cart"
                  className={`nav__link ${
                    activeLink === "Cart" ? "active-link" : ""
                  }`}
                  onClick={() => handleLinkClick("Cart")}
                >
                  {/* <FaShoppingCart size={24} color="black"/> */}
                  <FaShoppingCart size={24} color="black" />
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to=""
                  className={`nav__link ${
                    activeLink === "Logout" ? "active-link" : ""
                  }`}
                  onClick={() => handleLinkClick("Logout")}
                >
                  Logout
                </Link>
              </li>
            </ul>

            <div className="nav__close" id="nav-close">
              <i className="ri-close-line"></i>
            </div>
          </div>

          <div className="nav__btns">
            {/* <!-- Theme change button --> */}
            <i className="ri-moon-line change-theme" id="theme-button"></i>

            <div className="nav__toggle" id="nav-toggle">
              <i className="ri-menu-line"></i>
            </div>
          </div>
        </nav>
        <hr />
      </header>

      {/* <!--=============== SCROLL UP ===============--> */}
      <a href="#" class="scrollup" id="scroll-up">
        <i class="ri-arrow-up-fill scrollup__icon"></i>
      </a>

      {/* <!--=============== SCROLL REVEAL ===============--> */}
      <script src="./Controllers/scrollreveal.min.js"></script>

      {/* <!--=============== MAIN JS ===============--> */}
      <script src="./Controllers/main.js"></script>
    </>
  );
};

export default Navbar;
