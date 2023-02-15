import { createContext } from 'react'
import { BarberoType, EstadoType, Roles, ServicioCitaType, ServicioType, UserInterface } from '../types'
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
  user: null,
  loadingLogin: false,
  errorLogin: undefined,
  cita: DEFAULT_STATE_CITA,
  handleCita: () => {},
  isValidForm: false,
  rol: null,
  setRol: () => {},
  loadingRol: true,
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

  updateEstado: async () => await Promise.resolve(),

  barberoEdit: null,
  loadingBarbero: true,
  barberos: [],

  EditBarbero: async () => await Promise.resolve(),
  addBarberoEdit: () => {},
  addBarbero: async () => await Promise.resolve(),
  DeleteBarbero: async () => await Promise.resolve(),
}
export interface MainContextProps {
  servicios: ServicioType[]
  addCart: (servicio: ServicioType) => void
  deleteCart: (servicio: ServicioType) => void
  resetCart: () => void
  carrito: ServicioType[]
  user: UserInterface | null | undefined
  loadingLogin: boolean
  errorLogin: Error | undefined
  cita: InterfaceCitaProps
  handleCita: (cita: Function) => void
  isValidForm: boolean
  rol: Roles
  setRol: (rol: Roles) => void
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

  updateEstado: (id: string, estado: EstadoType) => Promise<void>

  barberoEdit: BarberoType | null
  loadingBarbero: boolean
  barberos: BarberoType[]

  EditBarbero: (barbero: BarberoType) => Promise<void>
  addBarberoEdit: (barbero: BarberoType) => void
  addBarbero: (barbero: BarberoType) => Promise<void>
  DeleteBarbero: (id: string) => Promise<void>
}
export const MainContext = createContext<MainContextProps>(DEFAULT_STATE)
