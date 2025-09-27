import { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import UserList from './components/UserList';

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'users'
  const [currentUser, setCurrentUser] = useState(null);

  // Handle successful login
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setCurrentView('users'); // Go to user list after login
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  return (
    <div>
      {/* Navigation Header */}
      <div className="bg-[#333] text-white px-8 py-5 flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
        <h1 className="text-2xl font-semibold mb-3 md:mb-0">
          User Management System
        </h1>

        <div>
          {currentUser ? (
            <div className="flex gap-2.5 items-center justify-center md:justify-end">
              <span>Welcome, {currentUser.username}!</span>
              <button 
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3.5 justify-center md:justify-end">
              <button 
                onClick={() => setCurrentView('login')}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </button>
              <button 
                onClick={() => setCurrentView('register')}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      {currentUser && (
        <div className="bg-[#f8f9fa] px-5 py-2.5 flex gap-2.5 justify-center md:justify-start">
          <button 
            onClick={() => setCurrentView('users')}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            View All Users
          </button>
          <button 
            onClick={() => setCurrentView('register')}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Add New User
          </button>
        </div>
      )}

      {/* Main Content */}
      <div>
        {currentView === 'register' && <Register />}
        {currentView === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
        {currentView === 'users' && currentUser && <UserList />}
      </div>

      {/* Show login prompt if not logged in and trying to access users */}
      {currentView === 'users' && !currentUser && (
        <div className="p-5 text-center">
          <p className="mb-3">Please login first to view users.</p>
          <button 
            onClick={() => setCurrentView('login')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
