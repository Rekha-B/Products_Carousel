import React from "react";
import "./Carousel.css";
import useCarouselHook from "./CarouselHook";

const Carousel = () => {
  const {
    products,
    nextSlide,
    prevSlide
  } = useCarouselHook();
  return (
    <React.Fragment>
      <div className="carousel">
        <i id="chevron-arrow-left" onClick={prevSlide} />
        <ol className="carousel-container">
          {products.map((product) => {
            return (
              <li key={product._id} className="carousel-item">
                <img
                  className="medium"
                  src={product.image}
                  alt={product.name}
                />
                <div className="card-body">
                  <h2>{product.name}</h2>
                  <p>{product.category}</p>
                  <div className="price">${product.price}</div>
                </div>
              </li>
            );
          })}
        </ol>
        <i id="chevron-arrow-right" onClick={nextSlide} />
      </div>
    </React.Fragment>
  );
};

export default Carousel;
