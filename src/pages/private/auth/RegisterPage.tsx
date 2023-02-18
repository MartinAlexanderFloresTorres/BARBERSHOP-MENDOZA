import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { auth } from '../../../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ChevronLeftSvg, LoaderSvg } from '../../../assets/svg'
import uploadImage from '../../../firebase/uploadImage'
import useAlerta from '../../../hooks/useAlerta'

const INICIAL_STATE = {
  campos: {
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    password: '',
    password2: '',
    file: null,
  },
}

interface RegisterPageState {
  campos: {
    nombre: string
    apellidos: string
    telefono: string
    email: string
    password: string
    password2: string
    file: File | null
  }
}

const RegisterPage = (): JSX.Element => {
  // Estados
  const [campos, setCampos] = useState<RegisterPageState['campos']>(INICIAL_STATE.campos)
  const [alerta, setAlerta] = useAlerta()
  const [loading, setLoading] = useState(false)

  // Efecto de scroll al inicio
  useEffect(() => {
    // Scroll al inicio
    window.scrollTo(0, 0)
  }, [])

  // handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    if (name === 'file') {
      if (!e.target.files) return
      setCampos({ ...campos, [name]: e.target.files[0] })
    } else {
      setCampos({ ...campos, [name]: value })
    }
  }

  // handleEliminarFile
  const handleEliminarFile = (): void => {
    setCampos({ ...campos, file: null })
  }

  // handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (loading) return
    setAlerta('')

    // Validar campos
    if (campos.nombre.trim() === '') {
      void Swal.fire({
        icon: 'info',
        title: 'Nombre requerido',
        text: 'El nombre es obligatorio',
      })
      return
    }

    if (campos.apellidos.trim() === '') {
      void Swal.fire({
        icon: 'info',
        title: 'Apellidos requeridos',
        text: 'Los apellidos son obligatorios',
      })
      return
    }

    if (campos.telefono.trim() === '') {
      void Swal.fire({
        icon: 'info',
        title: 'Teléfono requerido',
        text: 'El teléfono es obligatorio',
      })
      return
    }

    if (campos.email.trim() === '') {
      void Swal.fire({
        icon: 'info',
        title: 'Email requerido',
        text: 'El email es obligatorio',
      })
      return
    }

    if (campos.password.trim() === '') {
      void Swal.fire({
        icon: 'info',
        title: 'Password requerido',
        text: 'El password es obligatorio',
      })
      return
    }

    if (campos.password2.trim() === '') {
      void Swal.fire({
        icon: 'info',
        title: 'Password requerido',
        text: 'El password es obligatorio',
      })
      return
    }

    if (campos.password !== campos.password2) {
      void Swal.fire({
        icon: 'info',
        title: 'Password no coinciden',
        text: 'Los password no coinciden',
      })
      return
    }

    try {
      setLoading(true)
      const { user } = await createUserWithEmailAndPassword(auth, campos.email, campos.password)
      if (user) {
        await updateProfile(user, {
          displayName: `${campos.nombre} ${campos.apellidos}`,
        })

        if (campos.file) {
          const photoURL = await uploadImage(campos.file)
          await updateProfile(user, {
            photoURL,
          })
        }
      }

      void Swal.fire({
        icon: 'success',
        title: 'Usuario creado',
        text: 'El usuario se ha creado correctamente',
      })
    } catch (error: any) {
      console.log(error)
      setAlerta(error.code)
    }
    setLoading(false)
  }

  return (
    <>
      {alerta && (
        <div className="alerta alerta-error">
          <p>{alerta}</p>
        </div>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__cabezera">
          <Link className="" to="/auth/login">
            <ChevronLeftSvg />
            Volver
          </Link>
          <legend>Regístrate</legend>
        </div>

        <div className="form_grid">
          <div className="form__group">
            <label className="form__label" htmlFor="nombre">
              Nombre
            </label>
            <input type="text" name="nombre" value={campos.nombre} onChange={handleChange} id="nombre" placeholder="Nombre" />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="apellidos">
              Apellido
            </label>
            <input type="text" name="apellidos" value={campos.apellidos} onChange={handleChange} id="apellidos" placeholder="Apellido" />
          </div>
        </div>

        <div className="form__group">
          Foto
          {campos.file ? (
            <div className="form__file">
              <img src={URL.createObjectURL(campos.file)} alt="Foto" />
              <button className="btn btn-danger" type="button" onClick={handleEliminarFile}>
                Eliminar
              </button>
            </div>
          ) : (
            <label className="form__label form__label--margin" htmlFor="file">
              <div className="form__file">
                <span>Seleccione una foto</span>
                <input type="file" accept="image/jpeg, image/png, image/jpg, image/gif, image/webp, image/svg+xml" name="file" onChange={handleChange} id="file" placeholder="Nombre" />
              </div>
            </label>
          )}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="telefono">
            Teléfono
          </label>
          <input type="text" name="telefono" value={campos.telefono} onChange={handleChange} id="telefono" placeholder="Teléfono" />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input type="email" name="email" value={campos.email} onChange={handleChange} id="email" placeholder="Email" />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input type="password" name="password" value={campos.password} onChange={handleChange} id="password" placeholder="Password" />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="password2">
            Repetir password
          </label>
          <input type="password" name="password2" value={campos.password2} onChange={handleChange} id="password2" placeholder="Repetir password" />
        </div>

        <button className="form__button btn-primary" type="submit" disabled={loading}>
          {loading ? <LoaderSvg /> : 'Registrarse'}
        </button>

        <div className="form__link">
          ¿Ya tienes cuenta?{' '}
          <Link className="form__link--right" to="/auth/login">
            Inicia sesión
          </Link>
        </div>
      </form>
    </>
  )
}

export default RegisterPage
