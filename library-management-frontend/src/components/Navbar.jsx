import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, 
  Users, 
  Settings, 
  Menu, 
  X, 
  LogOut, 
  BookOpen, 
  BarChart2, 
  Search, 
  Bell,
  Clock,
  BookMarked,PenTool
} from 'lucide-react';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      setNotificationsOpen(false);
      setSearchOpen(false);
    }
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (!notificationsOpen) {
      setSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setNotificationsOpen(false);
    }
  };

  return (
    <nav className="bg-gray-800 rounded-lg shadow mb-8">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <BookMarked className="text-white" size={24} />
              </div>
              <div>
                <span className="text-xl font-bold text-white">LibraryMS</span>
                <span className="hidden md:inline-block text-gray-400 ml-2 text-sm">v1.0</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center">
              <BookOpen size={18} className="mr-1" />
              <span>Home</span>
            </Link>
            <Link to="/books" className="text-gray-300 hover:text-white transition-colors flex items-center">
              <Book size={18} className="mr-1" />
              <span>Books</span>
            </Link>
            <Link to="/publications" className="text-gray-300 hover:text-white transition-colors flex items-center">
              <BookMarked size={18} className="mr-1" />
              <span>Publications</span>
            </Link>
            <Link to="/students" className="text-gray-300 hover:text-white transition-colors flex items-center">
              <Users size={18} className="mr-1" />
              <span>Students</span>
            </Link>
            <Link to="/authors" className="text-gray-300 hover:text-white transition-colors flex items-center">
              <PenTool size={18} className="mr-1" />
              <span>Authors</span>
            </Link>
            <Link to="/issues" className="text-gray-300 hover:text-white transition-colors flex items-center">
              <Clock size={18} className="mr-1" />
              <span>Issues</span>
            </Link>
           
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center">
          

            {/* Notifications Button */}
            <button 
              onClick={toggleNotifications} 
              className="bg-gray-700 hover:bg-gray-600 text-gray-300 p-2 rounded-full transition-colors mr-2 relative"
            >
              <Bell size={18} />
              <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Link (Desktop) */}
          

            {/* Profile (Desktop) */}
            <Link 
              to="/profile"
              className="hidden md:flex items-center bg-gray-700 hover:bg-gray-600 text-gray-300 py-1 px-3 rounded-full transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mr-2">
                LV
              </div>
              <span>Admin</span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden bg-gray-700 hover:bg-gray-600 text-gray-300 p-2 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Dropdown */}
        {searchOpen && (
          <div className="mt-4 pb-2">
            <div className="flex bg-gray-700 rounded-lg">
              <input
                type="text"
                placeholder="Search for books, students, publications..."
                className="w-full py-2 px-4 bg-transparent text-white border-none focus:outline-none"
                autoFocus
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg">
                <Search size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Notifications Dropdown */}
        {notificationsOpen && (
          <div className="mt-4 bg-gray-700 rounded-lg p-2 absolute right-6 w-80 z-20 shadow-lg">
            <h3 className="text-white font-medium px-2 py-2 border-b border-gray-600">Notifications</h3>
            <div className="max-h-64 overflow-y-auto">
              <div className="p-2 hover:bg-gray-600 rounded cursor-pointer border-l-4 border-blue-500">
                <p className="text-white text-sm">5 books are due for return today</p>
                <p className="text-gray-400 text-xs mt-1">2 minutes ago</p>
              </div>
              <div className="p-2 hover:bg-gray-600 rounded cursor-pointer border-l-4 border-green-500">
                <p className="text-white text-sm">New student registration approved</p>
                <p className="text-gray-400 text-xs mt-1">1 hour ago</p>
              </div>
              <div className="p-2 hover:bg-gray-600 rounded cursor-pointer border-l-4 border-amber-500">
                <p className="text-white text-sm">Monthly report generated</p>
                <p className="text-gray-400 text-xs mt-1">Yesterday</p>
              </div>
            </div>
            <div className="border-t border-gray-600 mt-2 pt-2">
              <Link to="/notifications" className="text-blue-400 hover:text-blue-300 text-sm flex justify-center">
                View all notifications
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 bg-gray-750 rounded-b-lg">
          <div className="space-y-2 pt-2 pb-3">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors block py-2 px-3 rounded-lg hover:bg-gray-700 flex items-center">
              <BookOpen size={18} className="mr-2" />
              <span>Home</span>
            </Link>
            <Link to="/books" className="text-gray-300 hover:text-white transition-colors block py-2 px-3 rounded-lg hover:bg-gray-700 flex items-center">
              <Book size={18} className="mr-2" />
              <span>Books</span>
            </Link>
            <Link to="/publications" className="text-gray-300 hover:text-white transition-colors block py-2 px-3 rounded-lg hover:bg-gray-700 flex items-center">
              <BookMarked size={18} className="mr-2" />
              <span>Publications</span>
            </Link>
            <Link to="/students" className="text-gray-300 hover:text-white transition-colors block py-2 px-3 rounded-lg hover:bg-gray-700 flex items-center">
              <Users size={18} className="mr-2" />
              <span>Students</span>
            </Link>
            <Link to="/issues" className="text-gray-300 hover:text-white transition-colors block py-2 px-3 rounded-lg hover:bg-gray-700 flex items-center">
              <Clock size={18} className="mr-2" />
              <span>Issues</span>
            </Link>

            <div className="border-t border-gray-600 pt-2 mt-2">
              <div className="flex items-center justify-between py-2 px-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2">
                    AL
                  </div>
                  <div>
                    <p className="text-white">Admin User</p>
                    <p className="text-gray-400 text-sm">admin@library.com</p>
                  </div>
                </div>
                <Link to="/logout" className="text-red-400 hover:text-red-300">
                  <LogOut size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;