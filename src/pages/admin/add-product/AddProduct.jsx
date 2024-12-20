import { useState } from 'react';
import productApi from '../../../service/product.api';
import FileUploadApi from '../../../service/file-upload.api';
import { useNavigate } from 'react-router-dom';
import SelectField from '../../../Components/ui/select-field/SelectField';
import InputField from '../../../Components/ui/input-field/InputField';
import TextareaField from '../../../Components/ui/text-area/TextArea';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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
		if (files.length + selectedFiles.length > 4) {
			setError('Можно загрузить не более 4 изображений.');
			setTimeout(() => setError(null), 3000);
			return;
		}
		
		// Проверка формата файлов (например, только изображения)
		const validFileTypes = ['image/jpeg','image/jpg', 'image/png','image/webp',];
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
		try {
			setUploadingImages((prevUploading) => [...prevUploading, file.name]); // Добавляем файл в список загружаемых изображений
			const path = `uploads/${file.name}`;
			const imageUrl = await fileUploadApi.uploadFile(file, path);
			
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
		<div className="add-product-container">
			<h2 className="add-product-title">Добавить новый товар</h2>
			{error && (
				<div className="error-message">
					{error}
				</div>
			)}
			
			<div className="form-container">
				{/* Левая часть - текстовые поля */}
				<div className="left-form-section">
					<form onSubmit={(e) => e.preventDefault()}>
						<div className="input-fields-container">
							<InputField label="Название" name="name" value={formData.name} onChange={handleInputChange} />
							<InputField label="Цена" name="price" type="number" value={formData.price} onChange={handleInputChange} />
							<TextareaField label="Описание" name="description" value={formData.description} onChange={handleInputChange} />
							<InputField label="Количество на складе" name="stock" type="number" value={formData.stock} onChange={handleInputChange} />
						</div>
						
						<div className="input-fields-container">
							<SelectField
								label="Категория"
								name="category_id"
								value={formData.category_id}
								options={[
									{ value: '', label: 'Выберите категорию' },
									{ value: '1', label: 'Мужчины' },
									{ value: '2', label: 'Женщины' },
								]}
								onChange={handleInputChange}
							/>
							<SelectField
								label="Подкатегория"
								name="subcategory_id"
								value={formData.subcategory_id}
								options={[
									{ value: '', label: 'Выберите подкатегорию' },
									{ value: '1', label: 'Футболки' },
									{ value: '2', label: 'Брюки' },
									{ value: '3', label: 'Двойка для Девушек' },
									{ value: '5', label: 'Платье' },
								]}
								onChange={handleInputChange}
							/>
						</div>
					</form>
				</div>
				
				{/* Правая часть - загрузка изображений */}
				<div className="right-form-section">
					<div className="image-upload-section">
						<label className="select-label">Изображения (до 3 штук)</label>
						<input
							name="images"
							type="file"
							multiple
							onChange={handleImageChange}
							className="input-field"
						/>
					</div>
					
					{previewUrls.length > 0 && (
						<div className="image-preview-grid">
							{previewUrls.map((url, index) => (
								<div key={index} className="image-preview">
									<img src={url} alt={`preview-${index}`} />
									<button
										type="button"
										onClick={() => handleDeleteImage(index)}
										className="delete-image-button"
									>
										X
									</button>
									{uploadingImages.includes(files[index].name) && (
										<div className="upload-spinner-overlay">
											<Spin
												indicator={
													<LoadingOutlined
														style={{
															fontSize: 48,
														}}
														spin
													/>
												}
											/>
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			
			<button
				onClick={handleAddProduct}
				disabled={isSubmitting}
				className="submit-button"
			>
				{isSubmitting ? 'Сохранение...' : 'Добавить товар'}
			</button>
		</div>
	);
};

export default AddProduct;
