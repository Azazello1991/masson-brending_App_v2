import React from "react";
import StarRatings from "react-star-ratings";
// redux
import { useSelector } from "react-redux";

const Comments = () => {
  const { comments } = useSelector((state) => state.commentsProductSlice);

  return (
    <section className="comments product__comments">
      <div className="container">
        <ul className="comments__list">
          {comments.map((comment, i) => (
            
            <li key={comment.id ? comment.id + i : i} className="comments__item">
              <div className="comments__photo">
                <img
                  className="comments__img"
                  width="80"
                  height="80"
                  src={comment.photo ? comment.photo : "https://img.freepik.com/free-photo/skeleton-in-studio_23-2150891676.jpg"}
                  alt="photo"
                />
              <time className="comments__time">{ comment.time }</time>
              </div>
              <div className="comments__inner">
                <figcaption className="comments__autor">{comment.name}</figcaption>

                <StarRatings
                  rating={comment.rating}
                  starRatedColor="gold" // колір заповнених зірок
                  starHoverColor="yellow" // колір при наведенні
                  starDimension="16px" // розмір
                  starSpacing="2px" // дистанція між зірками
                  numberOfStars={5} // кількість
                  name="rating" // ім'я рейтинга (необов'язково)
                />

                <blockquote className="comments__comment">
                  {comment.text}
                </blockquote>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Comments;
