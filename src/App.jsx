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
  const { books } = useBooks();
  
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
        {books.slice(0, 6).map(book => (
          <div key={book.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p>{book.description}</p>
            <p><strong>Rating:</strong> {book.rating}/5</p>
            <Link to={`/book/${book.id}`} style={{
              display: 'inline-block',
              marginTop: '10px',
              padding: '6px 12px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px'
            }}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

function BrowsePage() {
  const { books, categories } = useBooks();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  let filteredBooks = selectedCategory === 'All' 
    ? books 
    : books.filter(book => book.category === selectedCategory);
  
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
  const { getBookById } = useBooks();
  const book = getBookById(id);
  
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
  const { addBook, categories } = useBooks();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    rating: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.rating) {
      newErrors.rating = 'Rating is required';
    } else if (isNaN(formData.rating) || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be a number between 1 and 5';
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      const newBook = {
        ...formData,
        rating: parseFloat(formData.rating)
      };
      addBook(newBook);
      setIsSubmitted(true);
      setFormData({ title: '', author: '', category: '', description: '', rating: '' });
    } else {
      setErrors(formErrors);
    }
  };
  
  if (isSubmitted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h1 style={{ color: '#28a745' }}>Book Added Successfully!</h1>
        <p>Your book has been added to the library.</p>
        <Link to="/browse" style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>Browse All Books</Link>
      </div>
    );
  }
  
  return (
    <div>
      <h1>Add New Book</h1>
      <p>Add a book to our library collection</p>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '20px 0' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              border: errors.title ? '2px solid red' : '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          {errors.title && <span style={{ color: 'red', fontSize: '14px' }}>{errors.title}</span>}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              border: errors.author ? '2px solid red' : '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          {errors.author && <span style={{ color: 'red', fontSize: '14px' }}>{errors.author}</span>}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              border: errors.category ? '2px solid red' : '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="">Select a category</option>
            {categories.filter(cat => cat !== 'All').map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <span style={{ color: 'red', fontSize: '14px' }}>{errors.category}</span>}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              border: errors.description ? '2px solid red' : '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical'
            }}
          />
          {errors.description && <span style={{ color: 'red', fontSize: '14px' }}>{errors.description}</span>}
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Rating (1-5):</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
            step="0.1"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              border: errors.rating ? '2px solid red' : '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          {errors.rating && <span style={{ color: 'red', fontSize: '14px' }}>{errors.rating}</span>}
        </div>
        
        <button
          type="submit"
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '12px 24px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add Book
        </button>
      </form>
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
