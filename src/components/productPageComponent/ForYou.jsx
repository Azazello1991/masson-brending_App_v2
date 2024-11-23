import React from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { useSelector } from "react-redux";
import Card from "../galleryComponents/Card";
import { useTranslation } from "react-i18next";

const ForYou = () => {
  const { t } = useTranslation();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null); // Реф для слайдера
  const { catalogItems } = useSelector(
    (state) => state.catalogSlice
  );

  return (
    <section className="recommend">
      <div className="container">
        <h2 className="recommend__title">{t('productPage.recomTitle') }</h2>
        <Swiper
          className="recommend__slider"
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={false}
          spaceBetween={20}
          slidesPerView={4}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.update(); // Обновляем навигацию
          }}
          pagination={{ clickable: true }}
          navigation={false} // Включаем навигацию для использования рефов
          breakpoints={{
        // при ширині >= 992px
        992: {
          slidesPerView: 4, 
        },
        // при ширині від 768 і до 992px
        768: {
          slidesPerView: 3, 
        },

        576: {
          slidesPerView: 2,
            },
        
        0: {
          slidesPerView: 1, 
        },
      }}
        >
          {catalogItems &&
            catalogItems.map((card, i) => (
              <SwiperSlide key={card.id}>
                <Card {...card} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ForYou;
