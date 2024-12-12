import { useState } from 'react';
import productApi from '../../service/product/product.api';
import FileUploadApi from '../../service/product/file-upload.api';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]); // Сохраняем все файлы
  const [uploadStatus, setUploadStatus] = useState('');
  const fileUploadApi = new FileUploadApi('photos'); // Указываем bucket "photos"

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

  const { name, price, description, stock, category_id, subcategory_id } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFiles([...e.target.files]); // Сохраняем файлы в массив
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
        const imageUrl = await fileUploadApi.uploadFile(file, path); // Загружаем файл
        uploadedImageUrls.push(imageUrl); // Сохраняем ссылку
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
      images: uploadedImageUrls, // Передаём массив ссылок на изображения
    };

    try {
      const addedProduct = await productApi.addProduct(newProduct);
      if (addedProduct) {
        alert('Продукт успешно добавлен');
        resetForm();
      }
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error);
      setError('Не удалось добавить продукт. Попробуйте снова.');
    }
  };

  const resetForm = () => {
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
            { value: '', label: 'Выберите категорию' },
            { value: '1', label: 'Мужчины' },
            { value: '2', label: 'Женщины' },
          ]}
          onChange={handleInputChange}
        />
        <SelectField
          label="Подкатегория"
          name="subcategory_id"
          value={subcategory_id}
          options={[
            { value: '', label: 'Выберите подкатегорию' },
            { value: '1', label: 'Футболки' },
            { value: '2', label: 'Брюки' },
          ]}
          onChange={handleInputChange}
        />
        <InputField
          label="Изображения (можно загрузить несколько)"
          name="images"
          type="file"
          multiple // Разрешаем загрузку нескольких файлов
          onChange={handleImageChange}
        />
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

const TextareaField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const SelectField = ({ label, name, value, options, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default AddProduct;
