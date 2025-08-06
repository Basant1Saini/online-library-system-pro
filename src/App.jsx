import { useState, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams, Link } from 'react-router-dom'
import { sampleBooks } from './data/books'
import './App.css'

// Create context for managing books state
const BooksContext = createContext();

// Custom hook to use books context
export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks must be used within BooksProvider');
  }
  return context;
};

// Basic page components
function HomePage() {
  return (
    <div>
      <h1>Welcome to Online Library System</h1>
      <p>Your digital library management system</p>
      
      <h2>Book Categories</h2>
      <ul>
        <li>Fiction</li>
        <li>Non-Fiction</li>
        <li>Sci-Fi</li>
      </ul>
      
      <h2>Popular Books</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {sampleBooks.map(book => (
          <div key={book.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p>{book.description}</p>
            <p><strong>Rating:</strong> {book.rating}/5</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function BrowsePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['All', 'Fiction', 'Non-Fiction', 'Sci-Fi'];
  
  let filteredBooks = selectedCategory === 'All' 
    ? sampleBooks 
    : sampleBooks.filter(book => book.category === selectedCategory);
  
  // Apply search filter
  if (searchTerm) {
    filteredBooks = filteredBooks.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div>
      <h1>Browse Books</h1>
      <p>Find your favorite books here</p>
      
      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Search Books:</h3>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Filter by Category:</h3>
        {categories.map(category => (
          <button 
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              margin: '5px',
              padding: '8px 16px',
              backgroundColor: selectedCategory === category ? '#007bff' : '#f8f9fa',
              color: selectedCategory === category ? 'white' : 'black',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {filteredBooks.map(book => (
          <div key={book.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p>{book.description}</p>
            <p><strong>Rating:</strong> {book.rating}/5</p>
            <Link to={`/book/${book.id}`}>
              <button style={{ 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                padding: '8px 12px', 
                borderRadius: '4px', 
                cursor: 'pointer',
                textDecoration: 'none'
              }}>
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

function BookDetailsPage() {
  const { id } = useParams();
  const book = sampleBooks.find(book => book.id === parseInt(id));
  
  if (!book) {
    return (
      <div>
        <h1>Book Not Found</h1>
        <p>The book you're looking for doesn't exist.</p>
        <Link to="/browse">Back to Browse Books</Link>
      </div>
    );
  }
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/browse" style={{ 
          color: '#007bff', 
          textDecoration: 'none',
          fontSize: '16px'
        }}>← Back to Browse</Link>
      </div>
      
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '30px'
      }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>{book.title}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>by {book.author}</p>
        
        <div style={{ marginBottom: '15px' }}>
          <span style={{
            backgroundColor: book.category === 'Fiction' ? '#e3f2fd' : 
                          book.category === 'Non-Fiction' ? '#f3e5f5' : '#e8f5e8',
            color: book.category === 'Fiction' ? '#1976d2' : 
                   book.category === 'Non-Fiction' ? '#7b1fa2' : '#388e3c',
            padding: '5px 12px',
            borderRadius: '15px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            {book.category}
          </span>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '18px', marginBottom: '5px' }}>
            <strong>Rating: </strong>
            <span style={{ color: '#ff9800', fontSize: '20px' }}>★</span>
            <span style={{ marginLeft: '5px', fontSize: '18px' }}>{book.rating}/5</span>
          </p>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '10px' }}>Description</h3>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
            {book.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function AddBookPage() {
  return (
    <div>
      <h1>Add New Book</h1>
      <p>Add a book to our library collection</p>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Go back to Home</a>
    </div>
  )
}

function App() {
  const [books, setBooks] = useState(sampleBooks);
  
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
    <BooksContext.Provider value={contextValue}>
      <Router>
        <div className="App">
          <nav style={{ padding: '20px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
            <Link to="/" style={{ margin: '0 15px', textDecoration: 'none', color: '#333' }}>Home</Link>
            <Link to="/browse" style={{ margin: '0 15px', textDecoration: 'none', color: '#333' }}>Browse Books</Link>
            <Link to="/add" style={{ margin: '0 15px', textDecoration: 'none', color: '#333' }}>Add Book</Link>
          </nav>
          
          <main style={{ padding: '20px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/book/:id" element={<BookDetailsPage />} />
              <Route path="/add" element={<AddBookPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BooksContext.Provider>
  )
}

export default App
