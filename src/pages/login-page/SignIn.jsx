import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from "../../service/user.api";

const SignIn = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false); // Управление видимостью пароля
	
	const handleChange = (e) => {
		const { name, value } = e.target;
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
		
		setIsLoading(true);
		try {
			await authService.signIn(email, password);
			navigate('/admin/products');
		} catch (err) {
			console.error('Ошибка авторизации:', err);
			setError('Ошибка авторизации. Проверьте введенные данные.');
		} finally {
			setIsLoading(false);
		}
	};
	
	const renderError = (message) => (
		<div className="text-red-600 text-sm bg-red-100 p-2 rounded">{message}</div>
	);
	
	return (
		<section className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-md p-6 bg-gray-50 rounded-lg shadow-md">
				<div className="flex flex-col items-center mb-6">
					<img
						className="w-32 h-32"
						src="/logo.svg"
						alt="Flowbite Logo"
					/>
				</div>
				
				<h2 className="text-xl font-bold text-gray-800 text-center mb-4">
					Вход в аккаунт
				</h2>
				
				{error && renderError(error)}
				
				<form onSubmit={handleSubmit} className="space-y-6">
					<InputField
						label="Email"
						id="email"
						name="email"
						type="email"
						placeholder="name@company.com"
						value={formData.email}
						onChange={handleChange}
					/>
					<PasswordField
						label="Пароль"
						id="password"
						name="password"
						placeholder="••••••••"
						value={formData.password}
						onChange={handleChange}
						showPassword={showPassword}
						togglePasswordVisibility={() => setShowPassword((prev) => !prev)}
					/>
					
					<div className="flex items-center justify-between">
						<CheckboxField
							id="remember"
							label="Запомнить меня"
						/>
						<a
							href="#"
							className="text-sm font-medium text-blue-600 hover:underline"
						>
							Забыли пароль?
						</a>
					</div>
					
					<button
						type="submit"
						disabled={isLoading}
						className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ${
							isLoading ? 'opacity-50 cursor-not-allowed' : ''
						}`}
					>
						{isLoading ? (
							<span className="flex items-center justify-center">
                <svg
	                className="w-5 h-5 mr-2 text-white animate-spin"
	                xmlns="http://www.w3.org/2000/svg"
	                fill="none"
	                viewBox="0 0 24 24"
                >
                  <circle
	                  className="opacity-25"
	                  cx="12"
	                  cy="12"
	                  r="10"
	                  stroke="currentColor"
	                  strokeWidth="4"
                  ></circle>
                  <path
	                  className="opacity-75"
	                  fill="currentColor"
	                  d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Загрузка...
              </span>
						) : (
							'Войти'
						)}
					</button>
				</form>
			</div>
		</section>
	);
};

const InputField = ({ label, id, name, type, placeholder, value, onChange }) => (
	<div>
		<label
			htmlFor={id}
			className="block mb-2 text-sm font-medium text-gray-700"
		>
			{label}
		</label>
		<input
			id={id}
			name={name}
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
			required
		/>
	</div>
);

const PasswordField = ({
	                       label,
	                       id,
	                       name,
	                       placeholder,
	                       value,
	                       onChange,
	                       showPassword,
	                       togglePasswordVisibility,
                       }) => (
	<div>
		<label
			htmlFor={id}
			className="block mb-2 text-sm font-medium text-gray-700"
		>
			{label}
		</label>
		<div className="relative">
			<input
				id={id}
				name={name}
				type={showPassword ? 'text' : 'password'}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				required
			/>
			<button
				type="button"
				onClick={togglePasswordVisibility}
				className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-600 focus:outline-none"
			>
				{showPassword ? 'Скрыть' : 'Показать'}
			</button>
		</div>
	</div>
);

const CheckboxField = ({ id, label }) => (
	<div className="flex items-center">
		<input
			id={id}
			type="checkbox"
			className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-blue-300"
		/>
		<label htmlFor={id} className="ml-2 text-sm text-gray-700">
			{label}
		</label>
	</div>
);

export default SignIn;
