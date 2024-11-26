class ProductApi {
  async getAllProducts() {
    try {
      const response = await fetch('https://673d89de0118dbfe86079da2.mockapi.io/api/v1/goods/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json(); // Парсинг ответа в формате JSON
      console.log('Полученные данные:', data);
      return data; // Возвращаем данные
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      return []; // Возвращаем пустой массив в случае ошибки
    }
  }
}

export default new ProductApi();
