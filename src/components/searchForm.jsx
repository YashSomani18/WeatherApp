import React from "react";
import { IoMdSearch } from "react-icons/io";

const SearchForm = ({ handleSubmit, handleInput, inputValue, showSearchButton, handleSearchButton }) => {
  return (
    <form
      className={`py-2 bg-black bg-opacity-30 mt-10 w-full max-w-screen-lg rounded-full backdrop-blur-[32px] mb-8`}
    >
      <div className="mb-4 h-full relative flex items-center justify-between p-2">
        <input
          onChange={handleInput}
          className="flex-1 bg-transparent outline-none text-center px-2 py-1 sm:py-2"
          type="text"
          placeholder="Search By City or Country or Zip Code"
          value={inputValue}
        />
        {showSearchButton ? (
          <button
            onClick={handleSearchButton}
            className="rounded-full flex justify-center items-center transition-colors duration-300 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3"
          >
            <IoMdSearch className="text-3xl" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="rounded-full flex justify-center items-center transition-colors duration-300 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3"
          >
            <IoMdSearch className="text-3xl" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchForm;
