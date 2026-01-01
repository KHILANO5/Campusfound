import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg",
        secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 focus:ring-gray-200",
        outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
