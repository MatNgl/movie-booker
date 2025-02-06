import React, { useState } from 'react';

function MoviesSearchPagination({ setSearch, setSort, setPage, currentPage }) {
  const [searchInput, setSearchInput] = useState('');
  const [sortInput, setSortInput] = useState('');

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleSort = () => {
    setSort(sortInput);
    setPage(1);
  };

  return (
    <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <div>
        <input
          type="text"
          placeholder="Recherche..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleSearch} className="button button-blue" style={{ marginLeft: '0.5rem' }}>
          Rechercher
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder='Trier par (ex: "title", "release_date")'
          value={sortInput}
          onChange={(e) => setSortInput(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleSort} className="button button-green" style={{ marginLeft: '0.5rem' }}>
          Trier
        </button>
      </div>
      <div>
        <button onClick={() => setPage(currentPage > 1 ? currentPage - 1 : 1)} className="button button-gray" style={{ marginRight: '0.5rem' }}>
          Précédent
        </button>
        <span>{currentPage}</span>
        <button onClick={() => setPage(currentPage + 1)} className="button button-gray" style={{ marginLeft: '0.5rem' }}>
          Suivant
        </button>
      </div>
    </div>
  );
}

export default MoviesSearchPagination;
