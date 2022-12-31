import { createContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { ServicioInterface, UserInterface } from '../types'

const DEFAULT_STATE = {
  servicios: [],
  addCart: () => {},
  deleteCart: () => {},
  carrito: [],
  item: 1,
  changeItem: () => {},
  user: null,
  loadingLogin: false,
  errorLogin: undefined,
}

export interface MainProviderProps {
  children: JSX.Element
}

export interface MainContextProps {
  servicios: ServicioInterface[]
  addCart: (servicio: ServicioInterface) => void
  deleteCart: (servicio: ServicioInterface) => void
  carrito: ServicioInterface[]
  item: number
  changeItem: (n: number) => void
  user: UserInterface | null | undefined
  loadingLogin: boolean
  errorLogin: Error | undefined
}
export const MainContext = createContext<MainContextProps>(DEFAULT_STATE)

const MainProvider = ({ children }: MainProviderProps): JSX.Element => {
  // Estado se servicios
  const [servicios, setServicios] = useState<MainContextProps['servicios']>([])
  const [carrito, setCarrito] = useState<MainContextProps['servicios']>([])

  // Estado para controlar el item que se muestra
  const [item, setItem] = useState<number>(1)

  // Estado para el usuario
  const [user, loadingLogin, errorLogin] = useAuthState(auth)

  // Efecto para  Obtener servicios
  useEffect(() => {
    void getServicios()
  }, [])

  // Obtener servicios
  const getServicios = async (): Promise<void> => {
    try {
      const data = [
        {
          id: 1,
          nombre: 'Servicio 1',
          descripcion:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
          precio: 1000,
          imagen: 'https://picsum.photos/200/300',
          cantidad: 1,
        },
        {
          id: 2,
          nombre: 'Servicio 2',
          descripcion:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
          precio: 1000,
          imagen: 'https://picsum.photos/200/100',
          cantidad: 5,
        },
      ]
      setServicios(data)
    } catch (error) {
      console.log(error)
    }
  }

  // Chage item
  const changeItem = (item: number): void => {
    setItem(item)
  }

  // agregar al carrito
  const addCart = (servicio: ServicioInterface): void => {
    const existe = carrito.find(item => item.id === servicio.id)
    if (existe != null) {
      setCarrito(
        carrito.map(item =>
          item.id === servicio.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        ),
      )
    } else {
      setCarrito([...carrito, { ...servicio, cantidad: 1 }])
    }
  }

  // eliminar del carrito
  const deleteCart = (servicio: ServicioInterface): void => {
    const existe = carrito.find(item => item.id === servicio.id)
    if (existe != null) {
      if (existe.cantidad === 1) {
        setCarrito(carrito.filter(item => item.id !== servicio.id))
      } else {
        setCarrito(
          carrito.map(item =>
            item.id === servicio.id
              ? { ...item, cantidad: item.cantidad - 1 }
              : item,
          ),
        )
      }
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
        carrito,
        item,
        changeItem,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export default MainProvider
