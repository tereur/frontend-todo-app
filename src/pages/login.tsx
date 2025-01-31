import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../services/auth';
import { setAuthToken } from '../utils/auth';
import "../styles/globals.css";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Etat pour gérer le chargement
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true); // Active le chargement

    try {
      const response = await login(email, password);
      if (response?.token) {
        console.log(response?.token);
        setAuthToken(response.token);
        router.push('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred, please try again.');
    } finally {
      setLoading(false); // Désactive le chargement
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            disabled={loading} 
          >
            {loading ? (
              <span className="animate-spin">🔄</span> 
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
