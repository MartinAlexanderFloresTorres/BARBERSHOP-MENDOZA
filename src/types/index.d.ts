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
