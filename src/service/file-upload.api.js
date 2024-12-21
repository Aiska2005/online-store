
class FileUploadApi {
  async uploadFile(file, path) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');
    formData.append('folder', path);
    
    const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL+'/image/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Ошибка загрузки изображения');
    }
    
    const data = await response.json();
    return data.secure_url; // Возвращаем URL загруженного изображения
  };
  
  
}

export default FileUploadApi;
