import {supabase} from './supabaseClient'; // Импортируем настроенный экземпляр Supabase

class ProductApi {
	// Получение всех товаров
	async getProducts() {
		const {data, error} = await supabase
			.from('products')
			.select('*');
		
		if (error) {
			console.error('Error fetching products:', error);
			return [];
		}
		
		return data;
	}
	
	// Получение товара по ID
	async getProductById(productId) {
		const {data, error} = await supabase
			.from('products')
			.select('*')
			.eq('id', productId)
			.single(); // Получаем только один товар
		
		if (error) {
			console.error('Error fetching product:', error);
			return null;
		}
		
		return data;
	}
	
	// Получение товаров по категории
	async getProductsByCategory(categoryId) {
		const {data, error} = await supabase
			.from('products')
			.select('*')
			.eq('category_id', categoryId);
		
		if (error) {
			console.error('Error fetching products by category:', error);
			return [];
		}
		
		return data;
	}
	
	// Добавление нового товара
	async addProduct(productData) {
		console.log(productData, 'productData---')
		const result = await supabase
			.from('products')
			.insert([productData])
			.select("*");
		console.log(result, 'response result ---')
		const {data, error} = result;
		
		
		if (error) {
			console.error('Error adding product:', error);
			return null;
		}
		return data[0];
	}
	
	// Обновление товара
	async updateProduct(productId, updatedData) {
		const {data, error} = await supabase
			.from('products')
			.update(updatedData)
			.eq('id', productId);
		
		if (error) {
			console.error('Error updating product:', error);
			return null;
		}
		
		return data[0];
	}
	
	// Удаление товара
	async deleteProduct(productId) {
		const {data, error} = await supabase
			.from('products')
			.delete()
			.eq('id', productId);
		
		if (error) {
			console.error('Error deleting product:', error);
			return false;
		}
		
		return true;
	}
	
	// Загрузка изображения в Supabase Storage
	async uploadImage(file) {
		const {data, error} = await supabase.storage
			.from('product-images') // Имя бакета
			.upload(`images/${file.name}`, file);
		
		if (error) {
			console.error('Error uploading image:', error);
			return null;
		}
		
		// Формируем URL изображения
		const imageUrl = `${supabase.storageUrl}/storage/v1/object/public/${data.path}`;
		return imageUrl;
	}
	
	// Получение всех изображений для товара
	async getProductImages(productId) {
		const {data, error} = await supabase
			.from('product_images')
			.select('*')
			.eq('product_id', productId);
		
		if (error) {
			console.error('Error fetching product images:', error);
			return [];
		}
		
		return data;
	}
	
	// Добавление изображения товара в базу данных
	async addProductImage(productId, imageUrl) {
		const {data, error} = await supabase
			.from('product_images')
			.insert([{product_id: productId, image_url: imageUrl}]);
		
		if (error) {
			console.error('Error adding product image:', error);
			return null;
		}
		
		return data[0];
	}
	
	// Удаление изображения товара
	async deleteProductImage(imageId) {
		const {data, error} = await supabase
			.from('product_images')
			.delete()
			.eq('id', imageId);
		
		if (error) {
			console.error('Error deleting product image:', error);
			return false;
		}
		
		return true;
	}
}

export default new ProductApi();

/*
Объяснение методов:
getProducts: Получение всех товаров.
getProductById: Получение товара по его ID.
getProductsByCategory: Получение товаров по категории (фильтрация по category_id).
addProduct: Добавление нового товара в таблицу products.
updateProduct: Обновление товара (например, цена, описание, количество).
deleteProduct: Удаление товара по его ID.
uploadImage: Загрузка изображения в Supabase Storage, которое будет связано с товаром.
getProductImages: Получение изображений для товара, если они есть в базе данных.
addProductImage: Добавление изображения для товара (сохранение URL изображения в базе).
deleteProductImage: Удаление изображения товара.
*/