import {supabase} from "./supabaseClient"; // Импортируем настроенный экземпляр Supabase

class ProductApi {
	// Получение всех товаров
	async getProducts() {
		const {data, error} = await supabase.from("products").select("*");
		
		if (error) {
			console.error("Ошибка при получении товаров:", error);
			return [];
		}
		
		return data;
	}
	
	// Получение товара по ID с цветами
	async getProductById(productId) {
		try {
			const {data, error} = await supabase
				.from('products')
				.select(`
			    *,
			    product_colors (
			      color_id,
			      colors (
			        id,
			        name
			      )
			    ),
			     product_images (
			      id,
			      images,
			      color
			    )
			  `)
				.eq('id', productId)
				.single();
			if (error) {
				console.error('Error fetching product with colors:', error);
				return null;
			}
			
			// Формируем удобный объект с цветами и изображениями
			const productWithDetails = {
				...data,
				colors: data.product_colors.map((pc) => pc.colors), // Извлекаем массив цветов
				images: data.product_images.map((pi) => ({
					id: pi.id,
					urls: pi.images, // Если images — это JSONB массив URL
					color: pi.color,
				})), // Извлекаем изображения
			};
			
			return productWithDetails;
		} catch (error) {
			console.error('Unexpected error:', error);
			return null;
		}
	}
	
	// Добавление нового товара
	async addProduct(productData) {
		console.log(productData, "productData---");
		const result = await supabase
			.from("products")
			.insert([productData])
			.select("*");
		console.log(result, "response result ---");
		const {data, error} = result;
		
		if (error) {
			console.error("Error adding product:", error);
			return null;
		}
		return data[0];
	}
	
	async getCategories() {
		try {
			const {data, error} = await supabase
				.from('categories')
				.select('*');
			
			if (error) {
				throw new Error(error.message);
			}
			
			return {data};
		} catch (err) {
			console.error('Ошибка при получении категорий:', err);
			throw err;
		}
	}
	
	async getSubcategories() {
		try {
			const {data, error} = await supabase
				.from('subcategories')
				.select('id, name, category_id');
			
			if (error) {
				throw new Error(error.message);
			}
			
			return {data};
		} catch (err) {
			console.error('Ошибка при получении подкатегорий:', err);
			throw err;
		}
	}
	
	async getProductColors() {
		try {
			const {data, error} = await supabase
				.from('colors')
				.select('id, name');
			
			if (error) {
				console.error('Ошибка при получении цветов:', error.message);
				throw new Error('Не удалось получить цвета. Попробуйте позже.');
			}
			
			return {data}; // Возвращаем только данные
		} catch (err) {
			console.error('Ошибка при получении цветов:', err);
			throw err;
		}
	}
	
	async addProductImage({product_id, images, color}) {
		try {
			const {data, error} = await supabase
				.from('product_images') // Замените на имя вашей таблицы
				.insert([
					{
						product_id, // ID продукта
						images, // JSONB массив изображений
						color, // Цвет изображения
					},
				]);
			
			if (error) {
				console.error('Ошибка при добавлении изображения продукта:', error);
				throw error;
			}
			
			console.log('Изображение продукта успешно добавлено:', data);
			return data;
		} catch (err) {
			console.error('Ошибка выполнения функции addProductImage:', err);
			throw err;
		}
	}
}

export default new ProductApi();
