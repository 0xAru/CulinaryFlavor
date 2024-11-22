/* eslint-disable react/prop-types */
const SearchBar = ({ value, onChange }) => {

  const handleSearch = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div className='flex justify-center my-2'>
      <input
        type="text"
        value={value}
        onChange={handleSearch}
        placeholder="Rechercher une recette..."
        className="border border-orange-800 rounded-lg p-2 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
