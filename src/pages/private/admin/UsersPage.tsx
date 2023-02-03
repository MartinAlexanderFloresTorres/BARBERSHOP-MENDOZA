import { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import User from '../../../components/containers/admin/users/User'
import { LoaderSvg, SearchSvg } from '../../../assets/svg'
import { UserType } from '../../../types'
import '../../../styles/UsersPage.css'

interface UsersPageProps {
  users: UserType[]
}

const UsersPage = (): JSX.Element => {
  // Estados
  const [users, setUsers] = useState<UsersPageProps['users']>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [busqueda, setBusqueda] = useState('')
  const [resultados, setResultados] = useState<UserType[]>([])

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

  // Effecto de resultados de busqueda
  useEffect(() => {
    const busquedaMinus = busqueda.toLowerCase().trim()
    const filtro = (user: UserType): boolean => user.nombre.toLowerCase().trim().includes(busquedaMinus)

    if (busqueda.length > 0) {
      const resultados = users.filter(filtro)
      setResultados(resultados)
    } else {
      setResultados(users)
    }
  }, [busqueda, users])

  // Handle Busqueda
  const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBusqueda(e.target.value)
  }

  // handle Search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const busquedaMinus = busqueda.toLowerCase().trim()
    const resultados = users.filter(user => user.nombre.toLowerCase().trim().includes(busquedaMinus))
    setResultados(resultados)
  }

  // Reset Resultados
  const resetResultados = (): void => {
    setResultados(users)
    setBusqueda('')
  }

  return (
    <section className="UsersPage">
      <h1>Usuarios</h1>
      <div className="UsersPage__top">
        <form onSubmit={handleSearch}>
          <input type="search" placeholder="Buscar" value={busqueda} onChange={handleBusqueda} />
          <button type="submit" title="Buscar" className="title">
            {<SearchSvg />}
          </button>
        </form>
      </div>

      {loading ? (
        <div className="loader__center">
          <LoaderSvg />
        </div>
      ) : resultados.length > 0 ? (
        <section className="UsersPage__grid">
          {resultados.map(user => (
            <User key={user.uid} user={user} />
          ))}
        </section>
      ) : (
        <p className="alerta">No hay usuarios</p>
      )}

      {!loading && resultados.length === 0 && (
        <button className="mx-auto my-10 btn btn-primary" onClick={resetResultados}>
          restablecer
        </button>
      )}
    </section>
  )
}

export default UsersPage
