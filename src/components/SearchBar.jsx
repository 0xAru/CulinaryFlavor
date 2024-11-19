/* eslint-disable react/prop-types */
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className='flex justify-center my-2'>
    
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Rechercher une recette..."
        className="border border-orange-800 rounded-lg p-2 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
