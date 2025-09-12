import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { user, logout } = useAuth();
  const dropdownTimeoutRef = useRef(null);

  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Berita Sekolah', path: '/berita' },
    { 
      name: 'Profil Sekolah', 
      path: '/profil',
      id: 'profil',
      dropdown: [
        { name: 'Sejarah', path: '/profil/sejarah' },
        { name: 'Visi Misi & Tujuan', path: '/profil/visi-misi' }
      ]
    },
    { name: 'Guru & Staff', path: '/guru-staff' },
    { 
      name: 'Kesiswaan', 
      path: '/kesiswaan',
      id: 'kesiswaan',
      dropdown: [
        { name: 'Prestasi Siswa', path: '/kesiswaan/prestasi' },
        { name: 'Ekstrakurikuler', path: '/kesiswaan/ekstrakurikuler' }
      ]
    },
    { name: 'Kontak Kami', path: '/kontak' }
  ];

  // Clear timeout when component unmounts
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleDropdownEnter = (dropdownId) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(dropdownId);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Small delay to allow moving to dropdown menu
  };

  const handleDropdownClick = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const handleLogout = async () => {
    await logout();
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" onClick={closeAllDropdowns}>
            <img 
              src="/assets/favicon.ico" 
              alt="Logo SMP Negeri 35 Bandar Lampung" 
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-blue-900">SMP Negeri 35</h1>
              <p className="text-xs text-gray-600">Bandar Lampung</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      className={`flex items-center space-x-1 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                        location.pathname.startsWith(item.path) || activeDropdown === item.id
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                      onMouseEnter={() => handleDropdownEnter(item.id)}
                      onMouseLeave={handleDropdownLeave}
                      onClick={() => handleDropdownClick(item.id)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {activeDropdown === item.id && (
                      <div 
                        className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 transform transition-all duration-200 ease-out"
                        onMouseEnter={() => handleDropdownEnter(item.id)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="py-1">
                          {item.dropdown.map((subItem, index) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              onClick={closeAllDropdowns}
                              className={`block px-4 py-3 text-sm transition-all duration-150 ${
                                location.pathname === subItem.path
                                  ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
                                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                              }`}
                            >
                              <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-blue-400 mr-3 opacity-60"></div>
                                {subItem.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={closeAllDropdowns}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Admin Link */}
            {user && (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                <Link
                  to="/admin"
                  onClick={closeAllDropdowns}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Admin
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdownClick(item.id)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-md text-base font-medium transition-colors ${
                          location.pathname.startsWith(item.path) || activeDropdown === item.id
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === item.id ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      {/* Mobile Dropdown */}
                      {activeDropdown === item.id && (
                        <div className="pl-4 space-y-1 mt-2 border-l-2 border-blue-100 ml-4">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              onClick={closeAllDropdowns}
                              className={`block px-4 py-3 rounded-md text-sm transition-colors ${
                                location.pathname === subItem.path
                                  ? 'text-blue-600 bg-blue-50'
                                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                              }`}
                            >
                              <div className="flex items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-3"></div>
                                {subItem.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={closeAllDropdowns}
                      className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                        location.pathname === item.path
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {user && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/admin"
                    onClick={closeAllDropdowns}
                    className="block px-4 py-3 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeAllDropdowns();
                    }}
                    className="block w-full text-left px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

