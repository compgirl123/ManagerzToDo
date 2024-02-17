import React from 'react';
import "./Filters.scss";

const Filters = ({ options, defaultLabel, className, handleOptionChange }) => {
  const handleChange = (e) => {
    const selectedCategory = e.target.value;
    handleOptionChange(selectedCategory);
  };

  return (
    <div className={className}>
      <select defaultValue ="" className="filtersDiv" onChange={handleChange}>
        <option value="" disabled>{defaultLabel}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
