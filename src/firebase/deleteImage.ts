import { ref, deleteObject } from 'firebase/storage'
import { storage } from './'

/**
 * Subir imagen a Firebase Storage
 * @param {File} file
 * @return {Promise<string>} url
 */
const deleteImage = async (url: string): Promise<void> => {
  // Create a reference to the file to delete
  const desertRef = ref(storage, url)

  return await deleteObject(desertRef)
}

export default deleteImage
