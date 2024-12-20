import React, { useState } from "react";
import ArrowIcon from "../../Assets/Icons/arrow.svg";
import ArrowUpIcon from "../../Assets/Icons/arrowUp.svg";
import CommonButton from "../../Components/ui/buttons/CommonButton";

const FilterSidebar = () => {
  // States
  const [price, setPrice] = useState([50, 200]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [openSection, setOpenSection] = useState(null);

  const colors = [
    "#00FF00",
    "#FFFF00",
    "#FFA500",
    "#00FFFF",
    "#0000FF",
    "#FF00FF",
    "#000000",
  ];
  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];
  const dressStyles = ["Casual", "Formal", "Party", "Gym"];

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-full lg:w-64 p-2 lg:p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold mb-4 text-center lg:text-left">
        Filters
      </h2>

      {/* Price Filter */}
      <div className="mb-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <h3 className="font-medium text-sm lg:text-base">Price</h3>
          <span>
            {openSection === "price" ? (
              <img src={ArrowUpIcon} alt="Collapse" />
            ) : (
              <img src={ArrowIcon} alt="Expand" />
            )}
          </span>
        </div>
        {openSection === "price" && (
          <div className="mt-2">
            <input
              type="range"
              min="50"
              max="200"
              value={price[0]}
              className="w-full"
              onChange={(e) => setPrice([+e.target.value, price[1]])}
            />
            <input
              type="range"
              min="50"
              max="200"
              value={price[1]}
              className="w-full"
              onChange={(e) => setPrice([price[0], +e.target.value])}
            />
            <div className="flex justify-between text-xs">
              <span>${price[0]}</span>
              <span>${price[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Colors Filter */}
      <div className="mb-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("colors")}
        >
          <h3 className="font-medium text-sm lg:text-base">Colors</h3>
          <span>
            {openSection === "colors" ? (
              <img src={ArrowUpIcon} alt="Collapse" />
            ) : (
              <img src={ArrowIcon} alt="Expand" />
            )}
          </span>
        </div>
        {openSection === "colors" && (
          <div className="mt-2 flex flex-wrap gap-2">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color }}
                className={`w-5 h-5 rounded-full ${
                  selectedColor === color ? "ring-2 ring-black" : ""
                }`}
              ></button>
            ))}
          </div>
        )}
      </div>

      {/* Sizes Filter */}
      <div className="mb-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("sizes")}
        >
          <h3 className="font-medium text-sm lg:text-base">Sizes</h3>
          <span>
            {openSection === "sizes" ? (
              <img src={ArrowUpIcon} alt="Collapse" />
            ) : (
              <img src={ArrowIcon} alt="Expand" />
            )}
          </span>
        </div>
        {openSection === "sizes" && (
          <div className="mt-2 flex flex-wrap gap-1">
            {sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-1 text-xs lg:text-sm border rounded ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dress Style Filter */}
      <div className="mb-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("dressStyles")}
        >
          <h3 className="font-medium text-sm lg:text-base">Dress Style</h3>
          <span>
            {openSection === "dressStyles" ? (
              <img src={ArrowUpIcon} alt="Collapse" />
            ) : (
              <img src={ArrowIcon} alt="Expand" />
            )}
          </span>
        </div>
        {openSection === "dressStyles" && (
          <ul className="mt-2 space-y-1 text-xs lg:text-sm text-gray-600">
            {dressStyles.map((style, index) => (
              <li
                key={index}
                onClick={() => console.log(`Selected: ${style}`)}
                className="cursor-pointer hover:text-black"
              >
                {style}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Apply Button */}
      <CommonButton className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 text-xs lg:text-sm">
        Apply Filter
      </CommonButton>
    </div>
  );
};

export default FilterSidebar;
