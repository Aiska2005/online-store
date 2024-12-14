import {useState} from 'react';
import productApi from '../../../service/product.api';
import FileUploadApi from '../../../service/file-upload.api';
import {useNavigate} from 'react-router-dom';
import SelectField from "../../../Components/ui/select-field/SelectField";
import InputField from "../../../Components/ui/input-field/InputField";
import TextareaField from "../../../Components/ui/text-area/TextArea";

const AddProduct = () => {
	const navigate = useNavigate();
	
	const [files, setFiles] = useState([]);
	const [previewUrls, setPreviewUrls] = useState([]); // Для предварительного просмотра
	const [uploadStatus, setUploadStatus] = useState('');
	const fileUploadApi = new FileUploadApi('photos'); // Указываем bucket "photos" // Указываем bucket "photos"
	
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
	
	const {name, price, description, stock, category_id, subcategory_id} = formData;
	
	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	
	const handleImageChange = (e) => {
		const selectedFiles = Array.from(e.target.files);
		
		// Проверка, чтобы общее количество изображений не превышало 4
		if (files.length + selectedFiles.length > 4) {
			setError('Можно загрузить не более 4 изображений.');
			setTimeout(() => setError(null), 3000);
			return;
		}
		
		// Создаем URL для предварительного просмотра новых файлов
		const newPreviewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
		setPreviewUrls((prevPreviewUrls) => [...prevPreviewUrls, ...newPreviewUrls]);
		
		// Добавляем новые файлы к уже существующим
		setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
	};

	
	const handleAddProduct = async () => {
		if (!name.trim() || !price || !description.trim() || !category_id || !subcategory_id) {
			setError('Пожалуйста, заполните все поля.');
			setTimeout(() => setError(null), 3000);
			return;
		}
		
		const uploadedImageUrls = [];
		
		try {
			for (const file of files) {
				const path = `uploads/${file.name}`;
				const imageUrl = await fileUploadApi.uploadFile(file, path);
				uploadedImageUrls.push(imageUrl);
			}
			
			setUploadStatus('Изображения успешно загружены.');
		} catch (uploadError) {
			console.error('Ошибка загрузки изображений:', uploadError);
			setError('Ошибка загрузки изображений. Попробуйте снова.');
			return;
		}
		
		const newProduct = {
			name,
			price: parseFloat(price),
			description,
			stock: parseInt(stock, 10),
			category_id: parseInt(category_id, 10),
			subcategory_id: parseInt(subcategory_id, 10),
			images: uploadedImageUrls,
		};
		
		try {
			const addedProduct = await productApi.addProduct(newProduct);
			if (addedProduct) {
				alert('Продукт успешно добавлен');
				resetForm();
				navigate('/admin/products/'); // Перенаправляем пользователя
			}
		} catch (error) {
			console.error('Ошибка при добавлении продукта:', error);
			setError('Не удалось добавить продукт. Попробуйте снова.');
		}
	};
	
	const resetForm = () => {
		// Освобождаем созданные URL
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
		setUploadStatus('');
	};

	
	
	return (
		<div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
			<h2 className="text-2xl font-bold text-center mb-4">Добавить новый товар</h2>
			{error && (
				<div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded">
					{error}
				</div>
			)}
			<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
				<InputField
					label="Название"
					name="name"
					value={name}
					onChange={handleInputChange}
				/>
				<InputField
					label="Цена"
					name="price"
					type="number"
					value={price}
					onChange={handleInputChange}
				/>
				<TextareaField
					label="Описание"
					name="description"
					value={description}
					onChange={handleInputChange}
				/>
				<InputField
					label="Количество на складе"
					name="stock"
					type="number"
					value={stock}
					onChange={handleInputChange}
				/>
				<SelectField
					label="Категория"
					name="category_id"
					value={category_id}
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
					value={subcategory_id}
					options={[
						{value: '', label: 'Выберите подкатегорию'},
						{value: '1', label: 'Футболки'},
						{value: '2', label: 'Брюки'},
						{value: '3', label: 'Двойка для Девушек'},
					]}
					onChange={handleInputChange}
				/>
				<InputField
					label="Изображения (до 4 штук)"
					name="images"
					type="file"
					multiple
					onChange={handleImageChange}
				/>
				
				{/* Отображение предварительного просмотра изображений */}
				{previewUrls.length > 0 && (
					<div className="mt-4 grid grid-cols-2 gap-4">
						{previewUrls.map((url, index) => (
							<div key={index} className="border p-2 rounded">
								<img src={url} alt={`preview-${index}`} className="w-full h-auto"/>
							</div>
						))}
					</div>
				)}
				
				<button
					onClick={handleAddProduct}
					className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition duration-200"
				>
					Добавить товар
				</button>
				{uploadStatus && (
					<div className="mt-2 text-green-600">{uploadStatus}</div>
				)}
			</form>
		</div>
	);
};

export default AddProduct;
