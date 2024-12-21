import { useState } from 'react';
import productApi from '../../../service/product.api';
import FileUploadApi from '../../../service/file-upload.api';
import { useNavigate } from 'react-router-dom';
import SelectField from '../../../Components/ui/select-field/SelectField';
import InputField from '../../../Components/ui/input-field/InputField';
import TextareaField from '../../../Components/ui/text-area/TextArea';
import imageCompression from 'browser-image-compression';
import './AddProduct.css'; // Import the CSS file

const AddProduct = () => {
	const navigate = useNavigate();
	
	const [files, setFiles] = useState([]);
	const [previewUrls, setPreviewUrls] = useState([]);
	const [formData, setFormData] = useState({
		name: '',
		price: '',
		description: '',
		stock: '',
		category_id: '',
		subcategory_id: '',
		images: [],
	});
	const [error, setError] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [uploadingImages, setUploadingImages] = useState([]); // Стейт для отслеживания загрузки изображений
	
	const fileUploadApi = new FileUploadApi('photos');
	
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};
	
	const handleImageChange = (e) => {
		const selectedFiles = Array.from(e.target.files);
		
		// Проверка на количество файлов
		if (files.length + selectedFiles.length > 3) {
			setError('Можно загрузить не более 3 изображений.');
			setTimeout(() => setError(null), 3000);
			return;
		}
		
		// Проверка формата файлов (например, только изображения)
		const validFileTypes = ['image/jpeg','image/jpg', 'image/png','image/webp','image/HEIC',];
		const invalidFiles = selectedFiles.filter(file => !validFileTypes.includes(file.type));
		
		if (invalidFiles.length > 0) {
			setError('Можно загружать только изображения формата JPG, PNG или Webp.');
			setTimeout(() => setError(null), 3000);
			return;
		}
		
		// Добавляем превью
		const newPreviewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
		setPreviewUrls((prevPreviewUrls) => [...prevPreviewUrls, ...newPreviewUrls]);
		setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
		
		// Запускаем загрузку изображений
		selectedFiles.forEach((file) => {
			uploadImage(file);
		});
	};
	
	const uploadImage = async (file) => {
		// Настройки для сжатия изображения
		const options = {
			maxSizeMB: 1, // Максимальный размер файла в мегабайтах
			maxWidthOrHeight: 1920, // Максимальная ширина или высота
			useWebWorker: true, // Использовать Web Worker для оптимизации
		};
		
		// Сжимаем изображение
		const compressedFile = await imageCompression(file, options);
		
		try {
			setUploadingImages((prevUploading) => [...prevUploading, file.name]); // Добавляем файл в список загружаемых изображений
			const path = `uploads/${file.name}`;
			const imageUrl = await fileUploadApi.uploadFile(compressedFile, path);
			
			setFormData((prevData) => ({
				...prevData,
				images: [...prevData.images, imageUrl], // Добавляем загруженную картинку в массив изображений
			}));
		} catch (error) {
			console.error('Ошибка при загрузке изображения:', error);
			setError('Не удалось загрузить одно или несколько изображений. Попробуйте снова.');
			setTimeout(() => setError(null), 6000);
		} finally {
			setUploadingImages((prevUploading) => prevUploading.filter((name) => name !== file.name)); // Убираем файл из списка загружаемых
		}
	};
	
	const handleDeleteImage = (index) => {
		const updatedFiles = files.filter((_, idx) => idx !== index);
		const updatedPreviewUrls = previewUrls.filter((_, idx) => idx !== index);
		setFiles(updatedFiles);
		setPreviewUrls(updatedPreviewUrls);
	};
	
	const handleAddProduct = async () => {
		// Проверка на заполнение всех полей
		if (!formData.name.trim() || !formData.price || !formData.description.trim() || !formData.category_id || !formData.subcategory_id) {
			setError('Пожалуйста, заполните все поля.');
			setTimeout(() => setError(null), 3000);
			return;
		}
		
		// Проверка на загрузку изображений
		if (uploadingImages.length > 0) {
			setError('Подождите, пока изображения загрузятся.');
			return;
		}
		
		setIsSubmitting(true);
		
		try {
			const newProduct = {
				...formData,
				price: parseFloat(formData.price),
				stock: parseInt(formData.stock, 10),
				category_id: parseInt(formData.category_id, 10),
				subcategory_id: parseInt(formData.subcategory_id, 10),
			};
			
			await productApi.addProduct(newProduct);
			alert('Продукт успешно добавлен');
			resetForm();
			navigate('/admin/products/');
		} catch (error) {
			console.error('Ошибка при добавлении продукта:', error);
			setError('Не удалось добавить продукт. Попробуйте снова.');
		} finally {
			setIsSubmitting(false);
		}
	};
	
	const resetForm = () => {
		previewUrls.forEach((url) => URL.revokeObjectURL(url));
		setFormData({
			name: '',
			price: '',
			description: '',
			stock: '',
			category_id: '',
			subcategory_id: '',
			images: [],
		});
		setFiles([]);
		setPreviewUrls([]);
		setError(null);
		setUploadingImages([]); // Сбросим статус загрузки изображений
	};
	
	return (
		<div className="max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-lg">
			<h2 className="text-3xl font-semibold text-gray-800 mb-6">Добавить новый товар</h2>
			
			{error && (
				<div className="mb-6 p-4 border-l-4 border-red-500 bg-red-50 text-red-700 rounded">
					{error}
				</div>
			)}
			
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Левая часть */}
				<div className="space-y-6">
					<InputField
						label="Название"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
					/>
					<InputField
						label="Цена"
						name="price"
						type="number"
						value={formData.price}
						onChange={handleInputChange}
					/>
					<TextareaField
						label="Описание"
						name="description"
						value={formData.description}
						onChange={handleInputChange}
					/>
					<InputField
						label="Количество на складе"
						name="stock"
						type="number"
						value={formData.stock}
						onChange={handleInputChange}
					/>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<SelectField
							label="Категория"
							name="category_id"
							value={formData.category_id}
							options={[
								{value: '', label: 'Выберите категорию'},
								{value: '1', label: 'Мужчины'},
								{value: '2', label: 'Женщины'},
							]}
							onChange={handleInputChange}
						/>
						<SelectField
							label="Подкатегория"
							name="subcategory_id"
							value={formData.subcategory_id}
							options={[
								{value: '', label: 'Выберите подкатегорию'},
								{value: '1', label: 'Футболки'},
								{value: '2', label: 'Брюки'},
								{value: '3', label: 'Двойка для Девушек'},
								{value: '5', label: 'Платье'},
							]}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				
				{/* Правая часть */}
				<div className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Изображения (до 3 штук)
						</label>
						<input
							type="file"
							name="images"
							multiple
							onChange={handleImageChange}
							className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					
					{previewUrls.length > 0 && (
						<div className="grid grid-cols-3 gap-4">
							{previewUrls.map((url, index) => (
								<div
									key={index}
									className="relative group border border-gray-200 rounded-lg overflow-hidden shadow"
								>
									<img
										src={url}
										alt={`preview-${index}`}
										className="w-full h-24 object-cover"
									/>
									<button
										type="button"
										onClick={() => handleDeleteImage(index)}
										className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow group-hover:opacity-100 transition-opacity opacity-0"
									>
										Удалить
									</button>
									{uploadingImages.includes(files[index]?.name) && (
										<div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
											<div
												className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			
			<div className="mt-8 text-right">
				<button
					onClick={handleAddProduct}
					disabled={isSubmitting}
					className={`inline-flex items-center justify-center px-6 py-3 text-white text-sm font-medium rounded-md shadow-md transition ${
						isSubmitting
							? 'bg-gray-400 cursor-not-allowed'
							: 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
					}`}
				>
					{isSubmitting ? (
						<>
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
							Сохранение...
						</>
					) : (
						'Добавить товар'
					)}
				</button>
			</div>
		</div>
	
	
	);
};

export default AddProduct;