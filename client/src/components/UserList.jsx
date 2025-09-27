import { useState, useEffect } from 'react';
import { userAPI } from '../services/api';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Load users when component mounts
  const loadUsers = async () => {
    setLoading(true);
    try {
      const result = await userAPI.getUsers();
      if (result.success) {
        setUsers(result.users || []);
      } else {
        setMessage('❌ ' + result.message);
      }
    } catch (error) {
      setMessage('❌ Error loading users: ' + (error.response?.data?.message || 'Something went wrong'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Delete user function
  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const result = await userAPI.deleteUser(userId);
      if (result.success) {
        setMessage('✅ ' + result.message);
        // Refresh the list
        loadUsers();
      }
    } catch (error) {
      setMessage('❌ Error deleting user: ' + (error.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">All Users ({users.length})</h2>
      
      <button 
        onClick={loadUsers} 
        disabled={loading}
        className={`px-4 py-2 mb-5 rounded ${
          loading ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {loading ? 'Loading...' : 'Refresh Users'}
      </button>

      {message && (
        <div 
          className={`mb-3 p-3 rounded ${
            message.includes('✅') 
              ? 'bg-green-100 text-green-800 border border-green-400' 
              : 'bg-red-100 text-red-800 border border-red-400'
          }`}
        >
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="grid gap-3">
          {users.map(user => (
            <div 
              key={user.id} 
              className="border border-gray-300 p-4 rounded flex justify-between items-center"
            >
              <div>
                <strong className="block">{user.username}</strong> 
                <span className="text-gray-600">{user.email}</span>
                <br />
                <small className="text-gray-500">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </small>
              </div>
              
              <button 
                onClick={() => deleteUser(user.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {users.length === 0 && !loading && (
        <p className="mt-4 text-gray-600">No users found.</p>
      )}
    </div>
  );
}

export default UserList;
