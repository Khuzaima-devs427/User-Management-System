import { useState } from 'react';
import { userAPI } from '../services/api';

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await userAPI.login(formData);
      
      if (result.success) {
        setMessage('✅ ' + result.message);
        if (onLoginSuccess) {
          onLoginSuccess(result.user);
        }
      } else {
        setMessage('❌ ' + result.message);
      }
    } catch (error) {
      setMessage('❌ Error: ' + (error.response?.data?.message || 'Something went wrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 max-w-[400px] mx-auto">
      <h2 className="text-xl font-semibold mb-4">User Login</h2>
      
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-3"
      >
        <div>
          <label className="block mb-1">Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Password: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`p-2 text-white rounded ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {message && (
        <div
          className={`mt-3 p-2 rounded ${
            message.includes('✅')
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default Login;
