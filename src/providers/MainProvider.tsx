import { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { DEFAULT_STATE_CITA, MainContext, MainContextProps, MainProviderProps } from '../contexts/MainContext'
import { BarberoType, EstadoType, ServicioCitaType, ServicioType } from '../types'
import { camposCita } from '../components/containers/admin/modales/ModalCita'

const MainProvider = ({ children }: MainProviderProps): JSX.Element => {
  // ESTADOS
  const [servicios, setServicios] = useState<MainContextProps['servicios']>([])
  const [carrito, setCarrito] = useState<MainContextProps['servicios']>([])
  const [user, loadingLogin, errorLogin] = useAuthState(auth)
  const [rol, setRol] = useState<MainContextProps['rol']>(null)
  const [loadingRol, setLoadingRol] = useState<boolean>(true)

  // Estados para el formulario de citas
  const [cita, setCita] = useState<MainContextProps['cita']>(DEFAULT_STATE_CITA)
  const [isValidForm, setIsValidForm] = useState<boolean>(false)

  // Estados para servicios page
  const [servicioEdit, setServicioEdit] = useState<ServicioType | null>(null)
  const [loadingServicio, setLoadingServicio] = useState<boolean>(true)

  // Estado para barberos page
  const [barberos, setBarberos] = useState<BarberoType[]>([])
  const [loadingBarbero, setLoadingBarbero] = useState<boolean>(true)
  const [barberoEdit, setBarberoEdit] = useState<BarberoType | null>(null)

  // Estados para Citas page
  const [citaEdit, setCitaEdit] = useState<ServicioCitaType | null>(null)

  // Obtener Servicios
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'servicios'), snapshot => {
      const serviciosFirebase = snapshot.docs.map(doc => ({
        ...(doc.data() as {}),
        id: doc.id,
      })) as []

      setLoadingServicio(false)
      setServicios(serviciosFirebase)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // Efecto de redireccionamiento
  useEffect(() => {
    if (user) {
      // Agregar al usuario a la base de datos
      const verificarUser = async (): Promise<void> => {
        try {
          setLoadingRol(true)
          // Verificar si el usuario existe mediante un where y buscar por el uid
          const querySnapshot = await getDocs(query(collection(db, 'usuarios'), where('uid', '==', user.uid)))
          if (querySnapshot.empty) {
            await addDoc(collection(db, 'usuarios'), {
              uid: user.uid,
              email: user.email,
              rol: 'user',
              photoURL: user.photoURL,
              phoneNumber: user.phoneNumber,
              displayName: user.displayName,
            })
          } else {
            const user = querySnapshot.docs[0].data()
            setRol(user.rol as MainContextProps['rol'])
          }
        } catch (error) {
          console.log(error)
        }
        setLoadingRol(false)
      }
      void verificarUser()
    } else {
      setRol(null)
    }
  }, [user])

  // Obtener Barberos
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'barberos'), snapshot => {
      const barberosFirebase = snapshot.docs.map(doc => ({
        ...(doc.data() as {}),
        id: doc.id,
      })) as []

      setLoadingBarbero(false)
      setBarberos(barberosFirebase)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // handleCita para el formulario de citas
  const handleCita = (cita: Function): void => {
    setCita(cita())

    if (Object.values(cita()).includes('')) {
      setIsValidForm(false)
    } else {
      setIsValidForm(true)
    }
  }

  // agregar al carrito
  const addCart = (servicio: ServicioType): void => {
    const existe = carrito.find(item => item.id.toString() === servicio.id.toString())

    if (servicio.cantidad === 0) {
      // Filtrar
      setCarrito(carrito.filter(item => item.id !== servicio.id))
      return
    }

    if (existe) {
      const newCarrito = carrito.map(item => {
        if (item.id === servicio.id) {
          return { ...item, cantidad: servicio.cantidad }
        } else {
          return item
        }
      })
      setCarrito(newCarrito)
      return
    }

    setCarrito([...carrito, servicio])
  }

  // eliminar del carrito
  const deleteCart = (servicio: ServicioType): void => {
    const existe = carrito.find(item => item.id === servicio.id)
    if (existe) {
      setCarrito(carrito.filter(item => item.id !== servicio.id))
    }
  }

  // resertear carrito
  const resetCart = (): void => {
    setCarrito([])
  }

  // Add Servicio
  const addServicio = async (servicio: object): Promise<void> => {
    await addDoc(collection(db, 'servicios'), servicio)
  }

  // Delete Servicio
  const deleteServicio = async (id: string): Promise<void> => {
    return await deleteDoc(doc(db, 'servicios', id))
  }

  // Add Servicio Edit
  const addServicioEdit = (servicio: ServicioType): void => {
    setServicioEdit(servicio)
  }

  // EditServicio
  const EditServicio = async (servicio: ServicioType): Promise<void> => {
    await updateDoc(doc(db, 'servicios', servicio.id), { ...servicio })
  }

  // Add Cita Edit
  const addCitaEdit = (cita: ServicioCitaType): void => {
    setCitaEdit(cita)
  }

  // Edit Cita
  const EditCita = async (cita: camposCita): Promise<void> => {
    if (cita.id) {
      await updateDoc(doc(db, 'citas', cita.id), { ...cita })
    }
  }

  // delete Cita
  const DeleteCita = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'citas', id))
  }

  // Actualizar Estado
  const updateEstado = async (id: string, estado: EstadoType): Promise<void> => {
    try {
      await updateDoc(doc(db, 'citas', id), { estado })
    } catch (error) {
      console.error(error)
    }
  }

  // editar barbero
  const EditBarbero = async (barbero: BarberoType): Promise<void> => {
    await updateDoc(doc(db, 'barberos', barbero.id), { ...barbero })
  }

  // Add Barbero Edit
  const addBarberoEdit = (barbero: BarberoType): void => {
    setBarberoEdit(barbero)
  }

  // Add Barbero
  const addBarbero = async (barbero: BarberoType): Promise<void> => {
    await addDoc(collection(db, 'barberos'), barbero)
  }

  // Eliminar Barbero
  const DeleteBarbero = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'barberos', id))
  }

  return (
    <MainContext.Provider
      value={{
        user,
        loadingLogin,
        errorLogin,
        servicios,
        addCart,
        deleteCart,
        resetCart,
        carrito,
        cita,
        handleCita,
        isValidForm,
        rol,
        setRol,
        loadingRol,
        addServicio,
        deleteServicio,
        addServicioEdit,
        servicioEdit,
        EditServicio,
        loadingServicio,
        EditCita,
        DeleteCita,
        addCitaEdit,
        citaEdit,
        updateEstado,
        barberoEdit,
        loadingBarbero,
        barberos,
        EditBarbero,
        addBarberoEdit,
        addBarbero,
        DeleteBarbero,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export default MainProvider
