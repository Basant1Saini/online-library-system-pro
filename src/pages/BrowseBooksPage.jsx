import React, { useState, useEffect } from 'react';
import { useBooks } from '../App';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../components/BookCard';

const BrowseBooksPage = () => {
    const { books, categories } = useBooks();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
    const [sortBy, setSortBy] = useState('title');
    const [filteredBooks, setFilteredBooks] = useState(books);

    useEffect(() => {
        let filtered = books;

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(book => book.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(book =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort books
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'author':
                    return a.author.localeCompare(b.author);
                case 'rating':
                    return b.rating - a.rating;
                case 'category':
                    return a.category.localeCompare(b.category);
                default:
                    return 0;
            }
        });

        setFilteredBooks(filtered);
    }, [books, selectedCategory, searchTerm, sortBy]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setSearchParams({});
        } else {
            setSearchParams({ category });
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Browse Books</h1>
                
                {/* Search and Filters */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div>
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                                Search Books
                            </label>
                            <input
                                type="text"
                                id="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by title, author, or description..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        {/* Category Filter */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Sort By */}
                        <div>
                            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="title">Title (A-Z)</option>
                                <option value="author">Author (A-Z)</option>
                                <option value="rating">Rating (High to Low)</option>
                                <option value="category">Category</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                {/* Results Summary */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600">
                        Showing {filteredBooks.length} of {books.length} books
                        {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                        {searchTerm && ` matching "${searchTerm}"`}
                    </p>
                    
                    {/* Clear Filters */}
                    {(searchTerm || selectedCategory !== 'All') && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('All');
                                setSearchParams({});
                            }}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>
            
            {/* Books Grid */}
            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No books found
                    </h3>
                    <p className="text-gray-500 mb-4">
                        Try adjusting your search terms or filters
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('All');
                            setSearchParams({});
                        }}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        View All Books
                    </button>
                </div>
            )}
        </div>
    );
};

export default BrowseBooksPage;
