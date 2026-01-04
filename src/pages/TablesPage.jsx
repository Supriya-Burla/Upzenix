import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Download, Film, Search, ChevronUp, ChevronDown, Loader } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const TablesPage = () => {
  const { addToast } = useToast();
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem('movies');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Avengers: Endgame', genre: 'Action', year: 2019, rating: 8.4 },
      { id: 2, title: 'The Shawshank Redemption', genre: 'Drama', year: 1994, rating: 9.3 },
      { id: 3, title: 'Inception', genre: 'Sci-Fi', year: 2010, rating: 8.8 },
      { id: 4, title: 'Pulp Fiction', genre: 'Crime', year: 1994, rating: 8.9 },
      { id: 5, title: 'The Dark Knight', genre: 'Action', year: 2008, rating: 9.0 },
    ];
  });

  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({ title: '', genre: '', year: '', rating: '' });
  const [isExporting, setIsExporting] = useState(false);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [genreFilter, setGenreFilter] = useState('');
  const [selectedMovies, setSelectedMovies] = useState([]);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    setSelectedMovies([]);
  }, [currentPage, filter, genreFilter, sortBy, sortOrder]);

  const genres = [...new Set(movies.map(movie => movie.genre))];
  const totalMovies = movies.length;
  const averageRating = movies.length > 0 ? (movies.reduce((sum, m) => sum + parseFloat(m.rating), 0) / movies.length).toFixed(1) : 0;
  const uniqueGenres = genres.length;

  const filteredMovies = movies.filter(movie =>
    (movie.title.toLowerCase().includes(filter.toLowerCase()) ||
     movie.genre.toLowerCase().includes(filter.toLowerCase())) &&
    (genreFilter === '' || movie.genre === genreFilter)
  ).sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    if (sortBy === 'rating' || sortBy === 'year') {
      aVal = parseFloat(aVal);
      bVal = parseFloat(bVal);
    } else {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
    addToast('Movie deleted successfully', 'success');
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormData({ title: movie.title, genre: movie.genre, year: movie.year, rating: movie.rating });
    setIsModalOpen(true);
  };

  const handleSelect = (id) => {
    setSelectedMovies(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedMovies.length === paginatedMovies.length) {
      setSelectedMovies([]);
    } else {
      setSelectedMovies(paginatedMovies.map(m => m.id));
    }
  };

  const handleBulkDelete = () => {
    setMovies(movies.filter(movie => !selectedMovies.includes(movie.id)));
    setSelectedMovies([]);
    addToast(`${selectedMovies.length} movies deleted successfully`, 'success');
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const handleClearFilters = () => {
    setFilter('');
    setGenreFilter('');
    setSortBy('title');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  const handleAdd = () => {
    setEditingMovie(null);
    setFormData({ title: '', genre: '', year: '', rating: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMovie) {
      setMovies(movies.map(movie => movie.id === editingMovie.id ? { ...movie, ...formData } : movie));
      addToast('Movie updated successfully', 'success');
    } else {
      const newMovie = { ...formData, id: Date.now() };
      setMovies([...movies, newMovie]);
      addToast('Movie added successfully', 'success');
    }
    setIsModalOpen(false);
  };

  const exportToCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      const headers = ['Title', 'Genre', 'Year', 'Rating'];
      const csvContent = [
        headers.join(','),
        ...filteredMovies.map(movie => [movie.title, movie.genre, movie.year, movie.rating].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'movies.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast('Movies exported to CSV', 'success');
      setIsExporting(false);
    }, 500); // Simulate processing time
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Movies Database</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your movie catalog and details</p>
        </div>
        <div className="flex space-x-3">
          {selectedMovies.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl flex items-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Bulk Delete ({selectedMovies.length})
            </button>
          )}
          <button
            onClick={exportToCSV}
            disabled={isExporting}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl flex items-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            {isExporting ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
            {isExporting ? 'Exporting...' : 'Export CSV'}
          </button>
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Movie
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Movies</p>
                <p className="text-3xl font-bold">{totalMovies}</p>
              </div>
              <Film className="w-12 h-12 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Average Rating</p>
                <p className="text-3xl font-bold">{averageRating}</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Genres</p>
                <p className="text-3xl font-bold">{uniqueGenres}</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎭</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search movies..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200 w-80"
            />
          </div>
          <div>
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleClearFilters}
            className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Clear Filters
          </button>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {paginatedMovies.length} of {filteredMovies.length} movies
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedMovies.length === paginatedMovies.length && paginatedMovies.length > 0}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('title')}>
                  Movie {sortBy === 'title' && (sortOrder === 'asc' ? <ChevronUp className="inline w-4 h-4 ml-1" /> : <ChevronDown className="inline w-4 h-4 ml-1" />)}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('genre')}>
                  Genre {sortBy === 'genre' && (sortOrder === 'asc' ? <ChevronUp className="inline w-4 h-4 ml-1" /> : <ChevronDown className="inline w-4 h-4 ml-1" />)}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('year')}>
                  Year {sortBy === 'year' && (sortOrder === 'asc' ? <ChevronUp className="inline w-4 h-4 ml-1" /> : <ChevronDown className="inline w-4 h-4 ml-1" />)}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('rating')}>
                  Rating {sortBy === 'rating' && (sortOrder === 'asc' ? <ChevronUp className="inline w-4 h-4 ml-1" /> : <ChevronDown className="inline w-4 h-4 ml-1" />)}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedMovies.map((movie) => (
              <tr key={movie.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-200 even:bg-gray-50 dark:even:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedMovies.includes(movie.id)}
                    onChange={() => handleSelect(movie.id)}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <Film className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{movie.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full">
                    {movie.genre}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{movie.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">{movie.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full mr-1 ${i < Math.floor(movie.rating) ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(movie)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fade-in_0.3s_ease-out]">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700 transform transition-all duration-300 scale-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Film className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingMovie ? 'Edit Movie' : 'Add New Movie'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {editingMovie ? 'Update movie information' : 'Add a new movie to your catalog'}
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Movie Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  placeholder="Enter movie title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Genre</label>
                <input
                  type="text"
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  placeholder="e.g., Action, Comedy, Drama"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Release Year</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                    placeholder="2024"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                    placeholder="8.5"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium transform hover:-translate-y-0.5"
                >
                  {editingMovie ? 'Update Movie' : 'Add Movie'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablesPage;