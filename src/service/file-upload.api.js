import { supabase } from './supabaseClient'; // Импортируем клиент Supabase

class FileUploadApi {
  constructor(bucketName) {
    if (!bucketName) {
      throw new Error('Bucket name is required');
    }
    this.bucketName = bucketName;
  }

  /**
   * Загрузка файла в Supabase Storage
   * @param {File} file - Файл для загрузки
   * @param {string} path - Путь для сохранения файла
   * @returns {Promise<string>} URL загруженного файла
   */
  async uploadFile(file, path) {
    if (!file || !path) {
      throw new Error('File and path are required');
    }

    const { data, error } = await supabase.storage
      .from(this.bucketName)
      .upload(path, file);

    if (error) {
      console.error('Ошибка загрузки файла:', error);
      throw error;
    }

    return this.getPublicUrl(path);
  }

  /**
   * Получение публичного URL файла
   * @param {string} path - Путь к файлу
   * @returns {string} Публичный URL файла
   */
  getPublicUrl(path) {
    const { data } = supabase.storage
      .from(this.bucketName)
      .getPublicUrl(path);

    return data?.publicUrl || null;
  }

  /**
   * Удаление файла
   * @param {string} path - Путь к файлу
   * @returns {Promise<void>}
   */
  async deleteFile(path) {
    const { error } = await supabase.storage
      .from(this.bucketName)
      .remove([path]);

    if (error) {
      console.error('Ошибка удаления файла:', error);
      throw error;
    }
  }

  /**
   * Получение списка файлов в папке
   * @param {string} folder - Путь к папке
   * @returns {Promise<Array>} Список файлов
   */
  async listFiles(folder) {
    const { data, error } = await supabase.storage
      .from(this.bucketName)
      .list(folder);

    if (error) {
      console.error('Ошибка получения списка файлов:', error);
      throw error;
    }

    return data;
  }
}

export default FileUploadApi;
