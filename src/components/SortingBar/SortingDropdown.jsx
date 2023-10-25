import React, { useState } from "react";
import Select from "react-select";
import "./SortingDropdown.css";

const SortingDropdown = ({ onSort }) => {
  const options = [
    { value: "rate", label: "Rate" },
    { value: "price", label: "Price" },
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedOption) => {
    const filteredOptions = selectedOption.filter(
      (option) => option.value === "price" || option.value === "rate"
    );

    const sortDirectionOptions = selectedOption.filter(
      (option) => option.value === "asc" || option.value === "desc"
    );

    if (filteredOptions.length > 1) {
      filteredOptions.length = 1;
    }

    if (sortDirectionOptions.length > 1) {
      sortDirectionOptions.length = 1;
    }

    const finalSelectedOptions = [...filteredOptions, ...sortDirectionOptions];

    setSelectedOptions(finalSelectedOptions);

    if (finalSelectedOptions.length === 2) {
      const [sortBySearch, sortDirSearch] = finalSelectedOptions.map(
        (option) => option.value
      );
      onSort(sortBySearch, sortDirSearch);
    }
  };

  return (
    <div className="sorting__widget text-end">
      <Select
        className="w-50"
        options={options}
        value={selectedOptions}
        isMulti
        onChange={handleChange}
        placeholder="Select Sorting Order"
      />
    </div>
  );
};

export default SortingDropdown;
