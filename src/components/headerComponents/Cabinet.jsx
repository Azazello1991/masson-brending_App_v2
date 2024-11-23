import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// redux
import { useSelector} from "react-redux";

const Cabinet = () => {
  const { historyItems, favoriteItems } = useSelector(
    (state) => state.favoriteSlice
  );
  const render = historyItems.length > 0 || favoriteItems.length > 0;
  const [lg, setLg] = React.useState(localStorage["i18nextLng"]);
  const { purchases } = useSelector((state) => state.cartSlice);
  // Багатомовний переклад
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLg(lng); // Метод для зміни мови
  };

  // якщо в local Storage не має даних, то по замовчуванню:
  useEffect(() => {
    if (lg !== 'en' && lg !== 'uk') {
      setLg("uk");
    }
  }, [lg]);

  return (
    <div className="header__nav-top">
      <div className="header__languages">
        <button
          className={
            lg === "en" ? "header__language-btn active" : "header__language-btn"
          }
          value={"en"}
          onClick={(event) => changeLanguage(event.target.value)}
          type="button"
        >
          EN
        </button>
        <button
          className={
            lg === "uk" ? "header__language-btn active" : "header__language-btn"
          }
          value={"uk"}
          onClick={(event) => changeLanguage(event.target.value)}
          type="button"
        >
          UA
        </button>
      </div>

      <div className="header__cabinet">
        <Link
          to={"/cart"}
          className="btn-icon header__cabinet-btn header__cart-btn"
          title="Кошик"
          aria-label="Кошик"
        >
          <span
            className="header__quantity"
            aria-label="Килькисть товару в кошику"
          >
            {purchases.length}
          </span>
        </Link>
        <Link
          to={"/history-page"}
          className="btn-icon header__cabinet-btn header__lickes-btn"
          type="button"
          title="Обране"
          aria-label="Обране"
        >
          {render && (
            <span
              className="header__quantity"
              aria-label="історія в кабінеті"
            ></span>
          )}
        </Link>
        <Link
          to="/logIn"
          className="header__log-in"
          type="button"
          title="Реєстрація"
          aria-label="Реєстрація"
        >
          Log
        </Link>
      </div>
    </div>
  );
};

export default Cabinet;
