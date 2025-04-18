import React from 'react';
import { Book, Users, Clock, Search, BookOpen, Shield, UserPlus, Library, ChevronRight } from 'lucide-react';
import Navbar from './Navbar';

export default function HomePage() {
  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-900 text-gray-200 min-h-screen">
      {/* Header Section with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 rounded-lg mb-8 shadow-lg">
        <Navbar />
        <div className="px-8 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white mb-4">Library Management System</h1>
            <p className="text-xl text-blue-100 mb-6">Your complete digital library solution for the modern age</p>
            <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md transition-all flex items-center">
              Get Started <ChevronRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* About Section with Enhanced Visual Appeal */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg mb-8 overflow-hidden border-l-4 border-blue-500">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 mix-blend-overlay"></div>
            <img 
              src="https://egov.eletsonline.com/wp-content/uploads/2016/10/digital-library-1000x473.jpg" 
              alt="Digital library interface" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 to-transparent h-24"></div>
          </div>
          <div className="p-8 md:p-10 md:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6 border-b-2 border-blue-500 pb-2 inline-block">About Our System</h2>
            <p className="text-gray-200 mb-4 text-lg">
              The Library Management System is a modern web application designed to streamline library operations. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it provides a robust and intuitive platform for managing books, students, authors, publishers, and book issuances.
            </p>
            <p className="text-gray-300 mb-4">
              Developed as a scalable solution, this system caters to libraries of all sizes, from small community collections to large academic institutions. It combines a responsive user interface with a powerful backend to ensure efficient data management and a seamless user experience.
            </p>
            <p className="text-gray-300">
              Whether you're a librarian tracking book loans or a student searching for resources, our system simplifies library management with features like real-time search, dynamic forms, and secure user authentication.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section with Bold Colors */}
      <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-8 text-white text-center">Powerful System Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/70 rounded-lg shadow-lg p-6 border-b-4 border-blue-500 hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-blue-600 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center mx-auto">
              <Book className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Book Management</h3>
            <p className="text-gray-300 text-center">Add, edit, delete, and search books with details like title, category, publisher, and authors.</p>
          </div>
          
          <div className="bg-gray-800/70 rounded-lg shadow-lg p-6 border-b-4 border-green-500 hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-green-600 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center mx-auto">
              <UserPlus className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Student Management</h3>
            <p className="text-gray-300 text-center">Register and manage student records, including name, semester, address, and contact numbers.</p>
          </div>
          
          <div className="bg-gray-800/70 rounded-lg shadow-lg p-6 border-b-4 border-purple-500 hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-purple-600 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center mx-auto">
              <Clock className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Issue Tracking</h3>
            <p className="text-gray-300 text-center">Record and monitor book issuances, track due dates, and manage fines for overdue returns.</p>
          </div>
          
          <div className="bg-gray-800/70 rounded-lg shadow-lg p-6 border-b-4 border-amber-500 hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-amber-600 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center mx-auto">
              <Library className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Author & Publisher</h3>
            <p className="text-gray-300 text-center">Maintain detailed records of authors and publishers linked to your book collection.</p>
          </div>
          
          <div className="bg-gray-800/70 rounded-lg shadow-lg p-6 border-b-4 border-blue-500 hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-blue-600 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center mx-auto">
              <Shield className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Secure Authentication</h3>
            <p className="text-gray-300 text-center">Protect user data with secure signup, login, and role-based access controls.</p>
          </div>
          
          <div className="bg-gray-800/70 rounded-lg shadow-lg p-6 border-b-4 border-green-500 hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-green-600 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center mx-auto">
              <Search className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Real-Time Search</h3>
            <p className="text-gray-300 text-center">Quickly find books, authors, or categories with dynamic search and filter options.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section with Enhanced Styling */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">What Users Say About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg shadow-lg p-6 relative">
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-bl-lg rounded-tr-lg font-bold">
              Librarian
            </div>
            <div className="mb-4">
              <div className="flex text-amber-400">
                {'★'.repeat(5)}
              </div>
            </div>
            <p className="text-gray-200 mb-6 italic text-lg">"This system has made managing our library so much easier. The interface is intuitive and the search feature is a game-changer."</p>
            <div className="flex items-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">JD</div>
              <div className="ml-4">
                <h4 className="text-white font-bold text-lg">Jane Doe</h4>
                <p className="text-blue-300">Community Library</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg shadow-lg p-6 relative">
            <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-2 rounded-bl-lg rounded-tr-lg font-bold">
              Staff
            </div>
            <div className="mb-4">
              <div className="flex text-amber-400">
                {'★'.repeat(5)}
              </div>
            </div>
            <p className="text-gray-200 mb-6 italic text-lg">"Tracking book issues and student records is now seamless. The system is fast and reliable."</p>
            <div className="flex items-center">
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">SR</div>
              <div className="ml-4">
                <h4 className="text-white font-bold text-lg">Sarah Robinson</h4>
                <p className="text-green-300">Westside Academy</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg shadow-lg p-6 relative">
            <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-2 rounded-bl-lg rounded-tr-lg font-bold">
              Developer
            </div>
            <div className="mb-4">
              <div className="flex text-amber-400">
                {'★'.repeat(5)}
              </div>
            </div>
            <p className="text-gray-200 mb-6 italic text-lg">"Building this system was a great learning experience. It's powerful and easy to use for managing library tasks."</p>
            <div className="flex items-center">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">ML</div>
              <div className="ml-4">
                <h4 className="text-white font-bold text-lg">Michael Lee</h4>
                <p className="text-purple-300">Library System Project</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 rounded-lg shadow-lg p-8 mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Library?</h2>
        <p className="text-gray-800 mb-6 max-w-2xl mx-auto">Join hundreds of libraries already using our system to streamline operations and enhance the experience for both librarians and patrons.</p>
       
      </div>

      {/* Footer with Bold Styling */}
      <div className="border-t border-gray-700 mt-8 pt-8 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold text-blue-400 mb-4 md:mb-0">LMS</div>
          <div className="text-center md:text-right">
            <p className="text-gray-400">© {new Date().getFullYear()} Library Management System</p>
            <p className="text-gray-500 text-sm mt-1">Empowering libraries with modern technology</p>
          </div>
        </div>
      </div>
    </div>
  );
}