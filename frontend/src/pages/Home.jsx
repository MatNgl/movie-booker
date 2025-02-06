import React, { useEffect, useState } from 'react';
import api from '../api'; // Fichier de configuration Axios (voir ci-dessous)
import MoviesList from '../components/MoviesList';
import MoviesSearchPagination from '../components/MoviesSearchPagination';

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movies', { params: { page, search, sort } });
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
      }
    };
    fetchMovies();
  }, [page, search, sort]);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Films</h1>
      <MoviesSearchPagination setSearch={setSearch} setSort={setSort} setPage={setPage} currentPage={page} />
      <MoviesList movies={movies} />
    </div>
  );
}

export default Home;
