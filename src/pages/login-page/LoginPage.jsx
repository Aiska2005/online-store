import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {authService} from "../../service/user.api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { email, password } = formData;
    if (!email.trim() || !password.trim()) {
      setError('Пожалуйста, заполните все поля.');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    try {
      await authService.signIn(email, password);
      navigate('/');
    } catch (err) {
      console.error('Ошибка авторизации:', err);
      setError(err.message);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Вход в аккаунт</h2>
        
        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Пароль"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition duration-200"
          >
            Войти
          </button>
        </form>
        
        <p className="mt-4 text-sm text-center text-gray-600">
          Нет аккаунта?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Зарегистрируйтесь
          </a>
        </p>
      </div>
    </div>
  );
};

const InputField = ({ label, type = 'text', name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default LoginPage;
