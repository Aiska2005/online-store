import {supabase} from "./supabaseClient";

class AuthService {
	/**
	 * Регистрация нового пользователя.
	 * @param {string} email - Электронная почта пользователя.
	 * @param {string} password - Пароль пользователя.
	 * @returns {Promise<object>} Результат запроса.
	 */
	async signUp(email, password) {
		const {data, error} = await supabase.auth.signUp({email, password});
		if (error) throw new Error(error.message);
		return data;
	}
	
	/**
	 * Вход пользователя в систему.
	 * @param {string} email - Электронная почта пользователя.
	 * @param {string} password - Пароль пользователя.
	 * @returns {Promise<object>} Результат запроса.
	 */
	async signIn(email, password) {
		const {data, error} = await supabase.auth.signInWithPassword({email, password});
		if (error) throw new Error(error.message);
		return data;
	}
	
	/**
	 * Выход пользователя из системы.
	 * @returns {Promise<void>} Результат запроса.
	 */
	async signOut() {
		const {error} = await supabase.auth.signOut();
		if (error) throw new Error(error.message);
	}
	
	/**
	 * Получение текущего пользователя.
	 * @returns {object|null} Текущий пользователь или null, если пользователь не аутентифицирован.
	 */
	getCurrentUser() {
		return supabase.auth.getUser();
	}
	
	/**
	 * Сброс пароля пользователя.
	 * @param {string} email - Электронная почта пользователя.
	 * @returns {Promise<object>} Результат запроса.
	 */
	async resetPassword(email) {
		const {data, error} = await supabase.auth.resetPasswordForEmail(email);
		if (error) throw new Error(error.message);
		return data;
	}
	
	/**
	 * Обновление данных текущего пользователя.
	 * @param {object} updates - Объект с обновляемыми данными.
	 * @returns {Promise<object>} Результат запроса.
	 */
	async updateUser(updates) {
		const {data, error} = await supabase.auth.updateUser(updates);
		if (error) throw new Error(error.message);
		return data;
	}
}

export  const authService = new AuthService();

