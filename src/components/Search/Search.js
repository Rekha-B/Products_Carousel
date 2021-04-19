import React from "react";
import "./Search.css";

const Search = ({categories, activeFilter, onFilterChange}) => {

  return (
    <section id="search">
      
      <ul>
       <label>Category : </label>
        {categories.map((category) => {
          return (
            <li key={category}>
              <label className="container">
                {category}
                <input
                  type="checkbox"
                  id={category}
                  checked={activeFilter.includes(category)}
                  onChange={onFilterChange(category)}
                />
                <span className="checkmark"></span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Search;
