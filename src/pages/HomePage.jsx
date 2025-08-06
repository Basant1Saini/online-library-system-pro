import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../App';
import BookCard from '../components/BookCard';

const HomePage = () => {
    const { books, categories } = useBooks();
    
    // Get featured books (first 6 books for homepage)
    const featuredBooks = books.slice(0, 6);
    
    // Get books by category for quick stats
    const bookStats = categories.slice(1).map(category => ({
        category,
        count: books.filter(book => book.category === category).length
    }));
    
    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-8 text-white">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to Our Online Library! 📚
                </h1>
                <p className="text-xl mb-6 opacity-90">
                    Discover amazing books from Indian authors and beyond
                </p>
                <div className="flex justify-center space-x-4">
                    <Link
                        to="/browse"
                        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Browse Books
                    </Link>
                    <Link
                        to="/add"
                        className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                    >
                        Add a Book
                    </Link>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-3xl font-bold text-blue-600">{books.length}</div>
                    <div className="text-gray-600">Total Books</div>
                </div>
                {bookStats.map(({ category, count }) => (
                    <div key={category} className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-3xl font-bold text-green-600">{count}</div>
                        <div className="text-gray-600">{category}</div>
                    </div>
                ))}
            </div>

            {/* Featured Books Section */}
            <section className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Featured Books</h2>
                    <Link
                        to="/browse"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        View All →
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.slice(1).map((category) => {
                        const categoryBooks = books.filter(book => book.category === category);
                        const categoryIcon = {
                            'Fiction': '📖',
                            'Non-Fiction': '📰',
                            'Sci-Fi': '🚀'
                        };
                        
                        return (
                            <Link
                                key={category}
                                to={`/browse?category=${category}`}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
                            >
                                <div className="text-4xl mb-2">{categoryIcon[category]}</div>
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                                    {category}
                                </h3>
                                <p className="text-gray-600">
                                    {categoryBooks.length} books available
                                </p>
                                <div className="mt-3 text-blue-600 group-hover:text-blue-800">
                                    Explore →
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
