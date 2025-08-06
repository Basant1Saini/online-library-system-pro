import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Mock fetch function (replace with real API call)
const fetchBookById = async (id) => {
    // Example data, replace with actual fetch logic
    return {
        id,
        title: 'Sample Book Title',
        author: 'Author Name',
        description: 'This is a detailed description of the book.',
        rating: 4.5,
    };
};

const BookDetailspage = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const getBook = async () => {
            const data = await fetchBookById(bookId);
            setBook(data);
        };
        getBook();
    }, [bookId]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', border: '1px solid #ddd', borderRadius: 8 }}>
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Rating:</strong> {book.rating} / 5</p>
            <button onClick={() => navigate('/browse')}>Back to Browse</button>
        </div>
    );
};

export default BookDetailspage;