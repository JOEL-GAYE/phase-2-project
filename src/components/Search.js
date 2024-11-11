import React from 'react'

const Search = () => {
  return (
    <div className="searchbar">
    <label htmlFor="search"></label>
    <input
      type="text"
      id="search"
      placeholder="Type a name to search..."
    />
  </div>
  );
}

export default Search
