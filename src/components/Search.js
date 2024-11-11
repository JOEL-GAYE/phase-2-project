import React from 'react'

const Search = ({handleSearch}) => {
  return (
    <div className="searchbar">
    <label htmlFor="search"></label>
    <input
      type="text"
      id="search"
      placeholder="Type a name to search..."
      onChange={handleSearch}
    />
  </div>
  );
}

export default Search
