import React from 'react';

export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 border border-transparent rounded-full font-semibold text-sm text-white tracking-wide hover:from-indigo-600 hover:to-purple-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg hover:-translate-y-0.5 ${
                    disabled ? 'opacity-50 cursor-not-allowed' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
