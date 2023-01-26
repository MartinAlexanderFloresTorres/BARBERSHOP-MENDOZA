import { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import User from '../../../components/containers/admin/users/User'
import { LoaderSvg } from '../../../assets/svg'
import { UserType } from '../../../types'

interface UsersPageProps {
  users: UserType[]
}

const UsersPage = (): JSX.Element => {
  // Estados
  const [users, setUsers] = useState<UsersPageProps['users']>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Effecto para Obtener los usuarios
  useEffect(() => {
    // Obtener los usuarios
    setLoading(true)
    const unsubscribe = onSnapshot(collection(db, 'usuarios'), snapshot => {
      const usuarios = snapshot.docs.map(doc => ({
        ...(doc.data() as UserType),
        id: doc.id,
      }))
      setUsers(usuarios)
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <section>
      <h1>Usuarios</h1>

      {loading ? (
        <LoaderSvg />
      ) : users.length > 0 ? (
        users.map(user => <User key={user.uid} user={user} />)
      ) : (
        <p>No hay usuarios</p>
      )}
    </section>
  )
}

export default UsersPage
