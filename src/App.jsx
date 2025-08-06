import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BrowseBooksPage from './pages/BrowseBooksPage';
import BookDetailsPage from './pages/BookDetailspage';
import AddBookPage from './pages/AddbookPage';
import NotFoundPage from './pages/NotFoundPage';
import { initialState } from './data/books';
import './App.css';

// Create Context for book management
const BookContext = createContext();

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

function App() {
  const [books, setBooks] = useState(initialState.books);

  const addBook = (newBook) => {
    const bookWithId = {
      ...newBook,
      id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1
    };
    setBooks(prevBooks => [...prevBooks, bookWithId]);
  };

  const getBookById = (id) => {
    return books.find(book => book.id === parseInt(id));
  };

  const getBooksByCategory = (category) => {
    if (category === 'All' || !category) return books;
    return books.filter(book => book.category === category);
  };

  const contextValue = {
    books,
    addBook,
    getBookById,
    getBooksByCategory,
    categories: ['All', 'Fiction', 'Non-Fiction', 'Sci-Fi']
  };

  return (
    <BookContext.Provider value={contextValue}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowseBooksPage />} />
              <Route path="/book/:id" element={<BookDetailsPage />} />
              <Route path="/add" element={<AddBookPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BookContext.Provider>
  );
}

export default App;
