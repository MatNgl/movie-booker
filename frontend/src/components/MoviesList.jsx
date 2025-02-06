import React from 'react';

function MoviesList({ movies }) {
  if (!movies.length) {
    return <p>Aucun film trouvé.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {movies.map((movie) => (
        <div key={movie.id} className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p style={{ color: '#718096', fontSize: '0.875rem' }}>Sortie : {movie.release_date}</p>
        </div>
      ))}
    </div>
  );
}

export default MoviesList;
