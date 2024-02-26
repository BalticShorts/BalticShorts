import React, { useEffect, useRef, useState } from 'react';

export const SearchableMovieDropdown = ({ items, selectedItems, setSelectedItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);

  const filteredItems = searchTerm
    ? items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : items.slice(0, 5);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleSelectItem = (item) => {
    if (!selectedItems.find(selected => selected.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
    setSearchTerm('');
    setIsFocused(false);
  };

  const handleRemoveItem = (id) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  return (
    <div className="mb-6 w-full relative" ref={wrapperRef}>
      
      <input
        className="shadow border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onFocus={() => setIsFocused(true)}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='relative'>
      {isFocused && (
        <ul className="absolute z-10 max-h-60 w-full overflow-auto bg-white border rounded shadow top-0">
        {filteredItems.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectItem(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
      </div>
      <div className="mt-2">
        {selectedItems.map((item) => (
          <div key={item.id} className="flex items-center p-2 border rounded mb-2 z-10">
            <span className="flex-grow">{item.name}</span>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handleRemoveItem(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
