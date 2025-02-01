import React, { useState } from "react";
import "./footer.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
  FaTwitterSquare
} from "react-icons/fa";
const Footer = () => {
  return (
    <>
      {/* <!--==================== FOOTER ====================--> */}
      <footer className="footer-section">
        <hr />
        <div className="footer__container container grid">
          <div className="footer__content">
            <a href="#" className="footer__logo">
              <i className="ri-leaf-line footer__logo-icon"></i> GardenBuzz
            </a>

            <h3 className="footer__title">
              Subscribe to our newsletter <br></br> to stay update
            </h3>

            <div className="footer__subscribe">
              <input
                type="email"
                placeholder="Enter your email"
                className="footer__input"
              />

              <button className="button button--flex-sub footer__button">
                Subscribe
                <i className="ri-arrow-right-up-line button__icon"></i>
              </button>
            </div>
          </div>

          <div className="footer__content">
            <h3 className="footer__title">Our Address</h3>

            <ul className="footer__data">
              <li className="footer__information">SP Hostel, Gulbai Tekra</li>
              <li className="footer__information"> Navrangpura</li>
              <li className="footer__information">Ahmedabad - 380006</li>
            </ul>
          </div>

          <div className="footer__content">
            <h3 className="footer__title">Contact Us</h3>

            <ul className="footer__data">
              <li className="footer__information">+916351869907</li>

              <div className="footer__social">
                <a href="https://www.facebook.com/profile.php?id=100014223515614" className="footer__social-link" target="_blank">
                  <i className="ri-facebook-fill"></i>
                  <FaFacebookSquare/>
                </a>
                <a href="https://www.instagram.com/hiren_patel_1.0/" className="footer__social-link" target="_blank">
                  <i className="ri-instagram-line"></i>
                  <FaInstagramSquare/>
                </a>
                <a href="https://twitter.com/" className="footer__social-link" target="_blank">
                  <i className="ri-twitter-fill"></i>
                  <FaTwitterSquare/>
                </a> 
                <a href="https://youtube.com/" className="footer__social-link" target="_blank">
                  <i className="ri-youtube-fill"></i>
                  <FaYoutubeSquare/>
                </a>
              </div>
              
            </ul>
          </div>

          <div className="footer__content">
            <h3 className="footer__title">We accept all credit cards</h3>

            <div className="footer__cards">
              <img src={require("./card1.png")} alt="" className="footer__card" />
              <img src={require("./card2.png")} alt="" className="footer__card" />
              <img src={require("./card3.png")} alt="" className="footer__card" />
              <img src={require("./card4.png")} alt="" className="footer__card" />
            </div>
          </div>
        </div>

        <p className="footer__copy">&#169; Gulgule. All rigths reserved</p>
      </footer>

      {/* <!--=============== SCROLL UP ===============--> */}
      <a href="#" className="scrollup" id="scroll-up">
        <i className="ri-arrow-up-fill scrollup__icon"></i>
      </a>

      {/* <!--=============== SCROLL REVEAL ===============--> */}
      <script src="./Controllers/scrollreveal.min.js"></script>

      {/* <!--=============== MAIN JS ===============--> */}
      <script src="./Controllers/main.js"></script>
    </>
  );
};

export default Footer;
