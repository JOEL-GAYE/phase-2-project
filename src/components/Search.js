import React from 'react';

const Search = ({ handleSearch }) => {
  return (
    <div className="form-group w-30">
      <label htmlFor="search" className="sr-only"></label>
      <input
        type="text"
        id="search"
        className="form-control border-0 border-bottom rounded-5"
        placeholder="Type a name to search..."
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
