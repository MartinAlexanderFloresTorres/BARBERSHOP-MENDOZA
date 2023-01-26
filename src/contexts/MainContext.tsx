import { createContext } from 'react'
import { EstadoType, Roles, ServicioCitaType, ServicioInterface, ServicioType, UserInterface } from '../types'
import { camposCita } from '../components/containers/admin/modales/ModalCita'

export const DEFAULT_STATE_CITA = {
  nombre: '',
  email: '',
  fecha: '',
  hora: '',
}

export interface MainProviderProps {
  children: JSX.Element
}

export interface InterfaceCitaProps {
  nombre: string
  email: string
  fecha: string
  hora: string
}

const DEFAULT_STATE = {
  servicios: [],
  addCart: () => {},
  deleteCart: () => {},
  resetCart: () => {},
  carrito: [],
  item: 1,
  changeItem: () => {},
  user: null,
  loadingLogin: false,
  errorLogin: undefined,
  cita: DEFAULT_STATE_CITA,
  handleCita: () => {},
  isValidForm: false,
  rol: null,
  loadingRol: false,
  addServicio: async () => await Promise.resolve(),
  deleteServicio: async () => await Promise.resolve(),
  addServicioEdit: () => {},
  servicioEdit: null,
  EditServicio: async () => await Promise.resolve(),
  loadingServicio: false,
  EditCita: async () => await Promise.resolve(),
  DeleteCita: async () => await Promise.resolve(),

  addCitaEdit: () => {},
  citaEdit: null,
  loadingCita: false,

  updateEstado: async () => await Promise.resolve(),
}
export interface MainContextProps {
  servicios: ServicioType[]
  addCart: (servicio: ServicioType) => void
  deleteCart: (servicio: ServicioType) => void
  resetCart: () => void
  carrito: ServicioType[]
  item: number
  changeItem: (n: number) => void
  user: UserInterface | null | undefined
  loadingLogin: boolean
  errorLogin: Error | undefined
  cita: InterfaceCitaProps
  handleCita: (cita: Function) => void
  isValidForm: boolean
  rol: Roles
  loadingRol: boolean
  addServicio: (servicio: object) => Promise<void>
  deleteServicio: (id: string) => Promise<void>
  addServicioEdit: (servicio: ServicioType) => void
  servicioEdit: ServicioType | null
  EditServicio: (servicio: ServicioType) => Promise<void>
  loadingServicio: boolean

  EditCita: (cita: camposCita) => Promise<void>
  DeleteCita: (id: string) => Promise<void>

  addCitaEdit: (cita: ServicioCitaType) => void
  citaEdit: ServicioCitaType | null
  loadingCita: boolean

  updateEstado: (id: string, estado: EstadoType) => Promise<void>
}
export const MainContext = createContext<MainContextProps>(DEFAULT_STATE)
