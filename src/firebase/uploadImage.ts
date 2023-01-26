import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './'
import { generarId } from '../helpers'

/**
 * Subir imagen a Firebase Storage
 * @param {File} file
 * @return {Promise<string>} url
 */
const uploadImage = async (file: File): Promise<string> => {
  const { name } = file
  const nombre = `${name.split('.')[0]}${generarId()}`
  await uploadBytes(ref(storage, nombre), file)
  return await getDownloadURL(ref(storage, nombre))
}

export default uploadImage
