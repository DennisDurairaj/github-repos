import React, { useState } from 'react';

function Search({ onSubmit }) {
  console.log('repos form');
  const [search, setSearch] = useState('');

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Search</label>
      <input value={search} onChange={handleChange} type="text" />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Search;
