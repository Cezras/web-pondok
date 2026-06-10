import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Profil', path: '/profil' },
    { name: 'Program', path: '/program' },
    { name: 'Galeri', path: '/galeri' },
    { name: 'Kontak', path: '/kontak' },
  ];

  return (
    <nav className="bg-white/85 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-3">
              {/* Logo Pondok Modern */}
              <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.jpg" 
                  alt="Logo Al-Hikmah" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/150?text=Logo";
                  }}
                />
              </div>
              <div>
                <h1 className="font-bold text-xl text-pesantren-darkGreen leading-tight">
                  Al-Hikmah
                </h1>
                <p className="text-xs text-gray-500 font-medium">Pondok Modern</p>
              </div>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 hover:text-pesantren-green ${
                    isActive ? 'text-pesantren-green border-b-2 border-pesantren-green pb-1' : 'text-gray-600'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-pesantren-green focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-pesantren-green text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-pesantren-green'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
