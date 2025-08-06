import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    
    const isActive = (path) => location.pathname === path;
    
    const linkClass = (path) => 
        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            isActive(path)
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
        }`;
    
    return (
        <nav className="bg-white shadow-lg border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                            📚 Online Library
                        </Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/" className={linkClass('/')}>
                            Home
                        </Link>
                        <Link to="/browse" className={linkClass('/browse')}>
                            Browse Books
                        </Link>
                        <Link to="/add" className={linkClass('/add')}>
                            Add Book
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
