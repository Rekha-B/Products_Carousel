import { useState } from "react";
import data from "../../data";

const getItemsToDisplay = (currentIndex) => {
  const  { products } = data;
  const lastIndex = products.length - 1;
  const prevItem = products[currentIndex === 0 ? lastIndex : currentIndex - 1];
  const currentItem = products[currentIndex];
  const nextItem = products[currentIndex === lastIndex ? 0 : currentIndex + 1];
  return [prevItem, currentItem, nextItem];
};

const useCarouselHook = () => {
  const [currentItemIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState(getItemsToDisplay(0));
  
  const prevSlide = () => {
    const lastIndex = data.products.length - 1;
    const shouldResetIndex = currentItemIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentItemIndex - 1;

    setProducts(getItemsToDisplay(index));
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const lastIndex = data.products.length - 1;
    const shouldResetIndex = currentItemIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentItemIndex + 1;
    setProducts(getItemsToDisplay(index));
    setCurrentIndex(index);
  };

  return {
    products,
    nextSlide,
    prevSlide
  };
};

export default useCarouselHook;
