import { db } from '../../../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { Roles, UserType } from '../../../../types'
import './User.css'

interface UserProps {
  user: UserType
}

const User = ({ user }: UserProps): JSX.Element => {
  const { uid, nombre, email, phoneNumber, photoURL, rol } = user
  console.log(user)

  // Funcion para actualizar el rol
  const handleRolChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.target
    const docRef = doc(db, 'usuarios', uid)
    updateDoc(docRef, {
      rol: value as Roles,
    }).catch(error => {
      console.warn('Error al actulizar rol ', error)
    })
  }
  return (
    <div>
      <img
        src={photoURL}
        onError={e => {
          const target = e.target as HTMLImageElement
          target.src = 'https://via.placeholder.com/150'
        }}
        alt={nombre}
      />
      <p>{nombre}</p>
      <p>{email ?? phoneNumber}</p>
      <select
        name="rol"
        onChange={handleRolChange}
        value={rol?.toString()}
        id="rol"
      >
        <option value="admin">admin</option>
        <option value="barbero">barbero</option>
        <option value="user">user</option>
      </select>
    </div>
  )
}

export default User
