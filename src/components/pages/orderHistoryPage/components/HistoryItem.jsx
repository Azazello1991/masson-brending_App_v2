import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import styles from "./HistoryItem.module.scss";
import { deleteItem } from "../../../../redux/slices/favoriteSlice";

const HistoryItem = ({ product, item }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Видалення єлементу зі списку
  const handlerDeleItem = (event) => {
    dispatch(deleteItem(event.target.id));
  };

  // Перехід на сторінку продукту
  const handleClick = () => {
    navigate(`/gallery/product/${product.id}`); // Переход на страницу товара
  };
  const lg = useTranslation()[1].language; // Мова перекладу en/uk
  // Перевірка на наявність url даних в product та item:
  const productUrl = product.url ? product.url : product.order && item.url;
  // Перевірка на наявність title/name в product та item:
  const productTitle = product.title
    ? product.title
    : product.order && item.name;
  const productDescription = product.description ? product.description : "";
  const productQuantity = product.order && item.quantity;
  const productPrice = product.price
    ? product.price
    : item.quantity * item.price;
  const productDate = product.date ? product.date : "";

  return (
    <article className={styles.product}>
      {!item && (
        <button
          className={`${styles.product__delete} delete`}
          title="Delete"
          id={product.id}
          onClick={(event) => handlerDeleItem(event)}
        ></button>
      )}

      <Link className={styles.product__link} onClick={handleClick}>
        <div className={styles.product__photo}>
          <img
            className={styles.product__img}
            height={200}
            width={150}
            src={productUrl}
            loading="lazy"
            alt="photo"
          />
        </div>
        <div className={styles.product__data}>
          <h3 className={styles.product__name}>{lg === "en" ? productTitle.en : productTitle.ua}</h3>
          {productDescription && (
            <div className={styles.product__subtitle}>{lg === "en" ? productDescription.en : productDescription.ua}</div>
          )}
          {productQuantity && (
            <div className={styles.product__quantity}>
              {t('historyPage.quantity')}
              <span className={styles.product__number}>{productQuantity}</span>
            </div>
          )}
          <div className={styles.product__price}>
            {productPrice} <span>{t("productPage.currency") }</span>
          </div>
          <span className={styles.product__time}>{productDate}</span>
        </div>
      </Link>
    </article>
  );
};

export default HistoryItem;
