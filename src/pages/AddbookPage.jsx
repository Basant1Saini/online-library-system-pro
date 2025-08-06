import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Simple state management for books (replace with Redux later)
const initialFormState = {
    title: '',
    author: '',
    isbn: '',
    publishedDate: '',
    genre: '',
};

function AddbookPage() {
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Placeholder for books state (replace with Redux)
    const [books, setBooks] = useState([]);

    const validate = () => {
        const newErrors = {};
        if (!form.title.trim()) newErrors.title = 'Title is required';
        if (!form.author.trim()) newErrors.author = 'Author is required';
        if (!form.isbn.trim()) newErrors.isbn = 'ISBN is required';
        if (!form.publishedDate.trim()) newErrors.publishedDate = 'Published date is required';
        if (!form.genre.trim()) newErrors.genre = 'Genre is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        // Add book to state (replace with Redux dispatch)
        setBooks([...books, { ...form, id: Date.now() }]);
        // Redirect to Browse Books page
        navigate('/browse-books');
    };

    return (
        <div style={{ maxWidth: 500, margin: '2rem auto' }}>
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label>Title:</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        type="text"
                    />
                    {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        name="author"
                        value={form.author}
                        onChange={handleChange}
                        type="text"
                    />
                    {errors.author && <div style={{ color: 'red' }}>{errors.author}</div>}
                </div>
                <div>
                    <label>ISBN:</label>
                    <input
                        name="isbn"
                        value={form.isbn}
                        onChange={handleChange}
                        type="text"
                    />
                    {errors.isbn && <div style={{ color: 'red' }}>{errors.isbn}</div>}
                </div>
                <div>
                    <label>Published Date:</label>
                    <input
                        name="publishedDate"
                        value={form.publishedDate}
                        onChange={handleChange}
                        type="date"
                    />
                    {errors.publishedDate && <div style={{ color: 'red' }}>{errors.publishedDate}</div>}
                </div>
                <div>
                    <label>Genre:</label>
                    <input
                        name="genre"
                        value={form.genre}
                        onChange={handleChange}
                        type="text"
                    />
                    {errors.genre && <div style={{ color: 'red' }}>{errors.genre}</div>}
                </div>
                <button type="submit" style={{ marginTop: '1rem' }}>Add Book</button>
            </form>
        </div>
    );
}

export default AddbookPage;