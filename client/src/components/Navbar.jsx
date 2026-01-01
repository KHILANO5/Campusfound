import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, PlusCircle, LogIn } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Search className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                CampusFound
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/create-post">
                            <Button variant="outline" className="flex items-center gap-2">
                                <PlusCircle className="w-4 h-4" />
                                Report Lost/Found
                            </Button>
                        </Link>
                        <div className="h-8 w-px bg-gray-200 mx-2"></div>
                        <Link to="/login">
                            <Button variant="ghost" className="font-semibold">Log in</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="primary" className="flex items-center gap-2">
                                Sign up
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/create-post"
                            className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Report Item
                        </Link>
                        <Link
                            to="/login"
                            className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Log in
                        </Link>
                        <Link
                            to="/register"
                            className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
