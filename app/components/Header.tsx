'use client';

import { useEffect, useState } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-card' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <ul className="flex justify-center space-x-8">
          <li>
            <a href="#about" className="hover:text-neon-blue transition-colors">
              // About
            </a>
          </li>
          <li>
            <a href="#members" className="hover:text-neon-blue transition-colors">
              // Members
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-neon-blue transition-colors">
              // Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-neon-blue transition-colors">
              // Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;