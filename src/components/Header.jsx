import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Logo from "../images/logo-masons-shop.svg";
import Categorys from "./headerComponents/Categorys";
import Cabinet from "./headerComponents/Cabinet";
import SearchHead from "./headerComponents/SearchHead";
import MobileMenu from "./pages/MobileMenu";

const Header = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const [isSticky, setIsSticky] = useState(false);
  const [activeBurger, setActiveBurger] = useState(false);
  const [show, setShow] = useState(false);
  const headerRef = useRef(null);

  // Поява меню-бургер в залежності від шерени екрану
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Липка шапка при скролі
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);

        /* if (window.innerWidth < 992) {
          setShow(false);
        } */

      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Обработчик клика вне шапки
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`${isSticky ? "header sticky" : "header"} ${
        show ? "show" : ""
      }`}
    >
      <div className="container">
        <div className="header__top">
          <SearchHead />

          <Link to="/" className="logo">
            <img
              className="logo__icon"
              src={Logo}
              width="184"
              height="63"
              alt="logo"
            ></img>
          </Link>

          {isLargeScreen ? (
            <Cabinet />
          ) : (
            <button
              className="burger"
              onClick={() => setActiveBurger(!activeBurger)}
              type="button"
            >
              <span className="burger__line"></span>
              <span className="sr-only tr">Відкрити меню</span>
            </button>
          )}
        </div>

        <Categorys
          setIsSticky={setIsSticky}
          setShow={setShow}
        />

        <MobileMenu
          activeBurger={activeBurger}
          setActiveBurger={setActiveBurger}
        />
      </div>
    </header>
  );
};

export default Header;
