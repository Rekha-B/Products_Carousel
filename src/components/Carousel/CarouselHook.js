import {  useState } from "react";
import masterData from "../../data";

const useCarouselHook = () => {
  const [activeFilter, setActivefilter] = useState([]);
  const [data, setData] = useState(masterData);

  /*
  * Retrieve items to display in carousel
  */
  const getItemsToDisplay = (currentIndex, customData) => {
    const { products } = customData || data;
    if (products.length > 2) {
      const lastIndex = products.length - 1;
      const prevItem =
        products[currentIndex === 0 ? lastIndex : currentIndex - 1];
      const currentItem = products[currentIndex];
      const nextItem =
        products[currentIndex === lastIndex ? 0 : currentIndex + 1];
      return [prevItem, currentItem, nextItem];
    }
    return products;
  };

  const [currentItemIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState(getItemsToDisplay(0));

  /**
   * Function triggers when clicked on left arrow
   */
  const prevSlide = () => {
    const lastIndex = data.products.length - 1;
    const shouldResetIndex = currentItemIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentItemIndex - 1;
    setProducts(getItemsToDisplay(index));
    setCurrentIndex(index);
  };

  /**
   * Function triggers when clicked on right arrow
   */
  const nextSlide = () => {
    const lastIndex = data.products.length - 1;
    const shouldResetIndex = currentItemIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentItemIndex + 1;
    setProducts(getItemsToDisplay(index));
    setCurrentIndex(index);
  };


  const categories = [
    ...new Set(masterData.products.map((item) => item.category)),
  ];

  /**
   * Function which triggers when on change is triggered in input type
   * @param {String} filter 
   * @returns 
   */
  const onFilterChange = (filter) => () => {
    let newFilters = [];
    if (activeFilter.includes(filter)) {
      const filterIndex = activeFilter.indexOf(filter);
      const newFilter = [...activeFilter];
      newFilter.splice(filterIndex, 1);
      newFilters = newFilter;
    } else {
      newFilters = [...activeFilter, filter];
    }

    const updatedProducts = masterData.products.filter((product) =>
      newFilters.includes(product.category)
    );
    setData({
      products: updatedProducts.length ? updatedProducts : masterData.products,
    });
    setProducts(
      updatedProducts.length
        ? getItemsToDisplay(0, { products: updatedProducts })
        : getItemsToDisplay(0, masterData)
    );
    setActivefilter(newFilters);
    setCurrentIndex(0);
  };

 
  return {
    products,
    nextSlide,
    prevSlide,
    categories,
    activeFilter,
    onFilterChange,
  };
};
export default useCarouselHook;