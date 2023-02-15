export interface ServicioInterface {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  cantidad: number
}

export interface UserInterface {
  displayName: string | null
  email: string | null
  emailVerified: boolean | null
  phoneNumber: string | null
  photoURL: string | null
  uid: string | null
}

export interface AlertInterface {
  mensaje: string
  tipo: 'error' | 'success' | 'warning' | 'info'
}

export type Roles = 'admin' | 'user' | 'barbero' | null

export interface UserType {
  id: string
  uid: string
  nombre: string
  email: string | null
  phoneNumber: string | null
  photoURL: string
  rol: Roles
}

export interface ServicioType {
  id: string
  imagen: string
  servicio: string
  descripcion: string
  precio: number
  barberos: BarberoType[]
  duracion: number
  stock: number
  cantidad: number
}

export interface BarberoType {
  id: string
  imagen: string
  titulo: string
  nombre: string
  especialidades: string
  incognito: boolean
}

export type EstadoType = 'pendiente' | 'cancelado' | 'atendido' | 'reprogramado' | 'warning'

export type ServicioCitaType = {
  id?: string | null | undefined
  user: string
  email: string
  fecha: string
  hora: string
  nombre: string
  pagado: boolean
  servicios: ServicioType[]
  estado: EstadoType
  createdAt: Date
}
