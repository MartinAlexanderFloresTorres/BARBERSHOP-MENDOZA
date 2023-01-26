import { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { DEFAULT_STATE_CITA, MainContext, MainContextProps, MainProviderProps } from '../contexts/MainContext'
import { EstadoType, ServicioCitaType, ServicioType } from '../types'
import { camposCita } from '../components/containers/admin/modales/ModalCita'

const MainProvider = ({ children }: MainProviderProps): JSX.Element => {
  // ESTADOS
  const [servicios, setServicios] = useState<MainContextProps['servicios']>([])
  const [carrito, setCarrito] = useState<MainContextProps['servicios']>([])
  const [item, setItem] = useState<number>(1)
  const [user, loadingLogin, errorLogin] = useAuthState(auth)
  const [rol, setRol] = useState<MainContextProps['rol']>(null)
  const [loadingRol, setLoadingRol] = useState<boolean>(false)

  // Estados para el formulario de citas
  const [cita, setCita] = useState<MainContextProps['cita']>(DEFAULT_STATE_CITA)
  const [isValidForm, setIsValidForm] = useState<boolean>(false)

  // Estados para servicios page
  const [servicioEdit, setServicioEdit] = useState<ServicioType | null>(null)
  const [loadingServicio, setLoadingServicio] = useState<boolean>(true)

  // Estados para Citas page
  const [citaEdit, setCitaEdit] = useState<ServicioCitaType | null>(null)
  const [loadingCita, setLoadingCita] = useState<boolean>(false)

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
  // agregar un campo de rol para todo los usuarios
  /*   const handleRol = async (rol: MainContextProps['rol']): Promise<void> => {
    try {
      const user = auth.currentUser
      if (user) {
        await setDoc(doc(db, 'usuarios', user.uid), {
          email: user.email,
          phoneNumber: user.phoneNumber,
          nombre: user.displayName,
          photoURL: user.photoURL,
          rol: 'admin',
          uid: user.uid,
        })
      }
    } catch (error) {
      console.log(error)
    }
  } */

  // Efecto de redireccionamiento
  useEffect(() => {
    if (user) {
      // Obtener el rol del usuario
      const getRol = async (): Promise<void> => {
        setLoadingRol(true)
        try {
          const docRef = doc(db, 'usuarios', user.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const rol = docSnap.data()?.rol as MainContextProps['rol']
            setRol(rol)
          }
        } catch (error) {
          console.log(error)
        }
        setLoadingRol(false)
      }
      void getRol()
    } else {
      setRol(null)
    }
  }, [user])

  // handleCita para el formulario de citas
  const handleCita = (cita: Function): void => {
    setCita(cita())

    if (Object.values(cita()).includes('')) {
      setIsValidForm(false)
    } else {
      setIsValidForm(true)
    }
  }
  // Chage item
  const changeItem = (item: number): void => {
    setItem(item)
  }

  // agregar al carrito
  const addCart = (servicio: ServicioType): void => {
    const existe = carrito.find(item => item.id.toString() === servicio.id.toString())
    if (existe) return

    setCarrito([...carrito, servicio])
  }

  // eliminar del carrito
  const deleteCart = (servicio: ServicioType): void => {
    const existe = carrito.find(item => item.id === servicio.id)
    if (!existe) {
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
        item,
        changeItem,
        cita,
        handleCita,
        isValidForm,
        rol,
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
        loadingCita,
        updateEstado,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export default MainProvider
