
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Embrace. All Rights Reserved.</p>
                <p className="mt-1">Empowering the next wave of artists.</p>
            </div>
        </footer>
    );
};

export default Footer;
