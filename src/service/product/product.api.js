class ProductApi {
  async getAllProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products/20');
      
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
