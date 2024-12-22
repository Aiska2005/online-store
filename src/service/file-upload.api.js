class FileUploadApi {
	async uploadFile(file, path) {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', 'ml_default');
		// formData.append('folder', path);
		if (process.env.REACT_APP_CLOUDINARY_URL) {
			const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL + '/image/upload', {
				method: 'POST',
				body: formData,
			});
			
			if (!response.ok) {
				throw new Error('Ошибка загрузки изображения');
			}
			return await response.json(); // Возвращаем URL загруженного изображения
		}
	};
	
	async deleteFile(publicId) {
		const apiKey = "387917665198853"; // Ваш API Key
		const apiSecret = "EYF7NWHbglMLaKv76PCv3Cfl3R4" // Ваш API Secret
		const timestamp = Math.floor(new Date().getTime() / 1000); // Текущее время в формате UNIX timestamp
		
		// Формируем строку для подписи
		const signatureString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
		
		// Делаем запрос на удаление изображения
		const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL + '/image/destroy', {
			method: 'POST',
			body: JSON.stringify({
				public_id: publicId,
				api_key: apiKey,
				timestamp: timestamp,
				signature: signatureString
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		
		if (!response.ok) {
			throw new Error('Ошибка удаления изображения');
		}
		
		const data = await response.json();
		console.log(data, 'data---delete');
		return data; // Возвращаем результат удаления
	}
}

export default FileUploadApi;
