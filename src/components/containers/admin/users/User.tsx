import { db } from '../../../../firebase'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { UserType } from '../../../../types'
import useMain from '../../../../hooks/useMain'
import { MainContextProps } from '../../../../contexts/MainContext'
import { UserSvg } from '../../../../assets/svg'
import './User.css'

interface UserProps {
  user: UserType
}

const User = ({ user }: UserProps): JSX.Element => {
  const { uid, nombre, email, phoneNumber, photoURL, rol } = user

  // useMain
  const { setRol, user: usuario } = useMain()

  // Funcion para actualizar el rol
  const handleRolChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.target

    // Agregar al usuario a la base de datos
    const verificarUser = async (): Promise<void> => {
      try {
        // Verificar si el usuario existe mediante un where y buscar por el uid
        const querySnapshot = await getDocs(query(collection(db, 'usuarios'), where('uid', '==', user.uid)))

        if (!querySnapshot.empty) {
          // Actualizar el rol en el contexto
          if (usuario?.uid === uid) {
            setRol(value as MainContextProps['rol'])
          }

          // Actualizar el rol
          const idDoc = querySnapshot.docs[0].id
          await updateDoc(doc(db, 'usuarios', idDoc), {
            rol: value,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    void verificarUser()
  }

  return (
    <div className="User">
      {user.photoURL ? (
        <img
          src={photoURL}
          onError={e => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/150'
          }}
          alt={nombre}
        />
      ) : (
        <UserSvg />
      )}
      <p>{nombre}</p>
      <a href={`${email !== null ? 'mailtro:'.concat(email) : phoneNumber ? 'tel:'.concat(phoneNumber) : '#'}`}>{email ?? phoneNumber}</a>
      <select name="rol" onChange={handleRolChange} value={rol?.toString()} id="rol">
        <option value="admin">administrador</option>
        <option value="barbero">barbero</option>
        <option value="user">usuario</option>
      </select>
    </div>
  )
}

export default User
