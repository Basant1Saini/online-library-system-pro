import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
    const getCategoryColor = (category) => {
        const colors = {
            'Fiction': 'bg-blue-100 text-blue-800',
            'Non-Fiction': 'bg-green-100 text-green-800',
            'Sci-Fi': 'bg-purple-100 text-purple-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <span key={i} className="text-yellow-400">★</span>
            );
        }
        
        if (hasHalfStar) {
            stars.push(
                <span key="half" className="text-yellow-400">☆</span>
            );
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <span key={`empty-${i}`} className="text-gray-300">☆</span>
            );
        }
        
        return stars;
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(book.category)}`}>
                        {book.category}
                    </span>
                    <div className="flex items-center space-x-1">
                        {renderStars(book.rating)}
                        <span className="text-sm text-gray-600 ml-1">({book.rating})</span>
                    </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {book.title}
                </h3>
                
                <p className="text-gray-600 mb-3 font-medium">
                    by {book.author}
                </p>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {book.description}
                </p>
                
                <Link
                    to={`/book/${book.id}`}
                    className="inline-block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default BookCard;
