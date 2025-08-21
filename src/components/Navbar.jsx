import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/useAuth';
import schoolLogo from '../assets/doQSy0TQT8g8.jpg'; // Using one of the school logo templates

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profilDropdown, setProfilDropdown] = useState(false);
  const [kesiswaanDropdown, setKesiswaanDropdown] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Berita Sekolah', path: '/berita' },
    { 
      name: 'Profil Sekolah', 
      path: '/profil',
      dropdown: [
        { name: 'Sejarah', path: '/profil/sejarah' },
        { name: 'Visi Misi & Tujuan', path: '/profil/visi-misi' }
      ]
    },
    { name: 'Guru & Staff', path: '/guru-staff' },
    { 
      name: 'Kesiswaan', 
      path: '/kesiswaan',
      dropdown: [
        { name: 'Prestasi Siswa', path: '/kesiswaan/prestasi' },
        { name: 'Ekstrakurikuler', path: '/kesiswaan/ekstrakurikuler' }
      ]
    },
    { name: 'Kontak Kami', path: '/kontak' }
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={schoolLogo} 
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
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location.pathname.startsWith(item.path)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                      onMouseEnter={() => {
                        if (item.name === 'Profil Sekolah') setProfilDropdown(true);
                        if (item.name === 'Kesiswaan') setKesiswaanDropdown(true);
                      }}
                      onMouseLeave={() => {
                        if (item.name === 'Profil Sekolah') setProfilDropdown(false);
                        if (item.name === 'Kesiswaan') setKesiswaanDropdown(false);
                      }}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {((item.name === 'Profil Sekolah' && profilDropdown) || 
                      (item.name === 'Kesiswaan' && kesiswaanDropdown)) && (
                      <div 
                        className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
                        onMouseEnter={() => {
                          if (item.name === 'Profil Sekolah') setProfilDropdown(true);
                          if (item.name === 'Kesiswaan') setKesiswaanDropdown(true);
                        }}
                        onMouseLeave={() => {
                          if (item.name === 'Profil Sekolah') setProfilDropdown(false);
                          if (item.name === 'Kesiswaan') setKesiswaanDropdown(false);
                        }}
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              location.pathname === subItem.path
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
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
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Admin
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
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
                        onClick={() => {
                          if (item.name === 'Profil Sekolah') setProfilDropdown(!profilDropdown);
                          if (item.name === 'Kesiswaan') setKesiswaanDropdown(!kesiswaanDropdown);
                        }}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {((item.name === 'Profil Sekolah' && profilDropdown) || 
                        (item.name === 'Kesiswaan' && kesiswaanDropdown)) && (
                        <div className="pl-4 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              onClick={() => setIsOpen(false)}
                              className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
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
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Admin
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
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

