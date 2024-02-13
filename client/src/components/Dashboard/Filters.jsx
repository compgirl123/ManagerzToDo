import React from 'react';

const Filters = ({ options, defaultLabel, className, handleOptionChange }) => {
  const handleChange = (e) => {
    const selectedCategory = e.target.value;
    handleOptionChange(selectedCategory);
  };

  return (
    <div className={className}>
      <select defaultValue="" onChange={handleChange}>
        <option value="" disabled>{defaultLabel}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
