import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { sampleBooks } from './data/books'
import './App.css'

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
  return (
    <div>
      <h1>Browse Books</h1>
      <p>Find your favorite books here</p>
    </div>
  )
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
  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '20px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
          <a href="/" style={{ margin: '0 15px' }}>Home</a>
          <a href="/browse" style={{ margin: '0 15px' }}>Browse Books</a>
          <a href="/add" style={{ margin: '0 15px' }}>Add Book</a>
        </nav>
        
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/add" element={<AddBookPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
