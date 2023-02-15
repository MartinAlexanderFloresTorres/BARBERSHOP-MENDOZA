import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import RedesAuth from '../../../components/containers/redes/RedesAuth'
import { ChevronLeftSvg, LoaderSvg } from '../../../assets/svg'
import { auth } from '../../../firebase'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import useAlerta from '../../../hooks/useAlerta'

const INICIAL_STATE = {
  campos: {
    email: '',
    password: '',
  },
}

const LoginPage = (): JSX.Element => {
  // Estados
  const [campos, setCampos] = useState(INICIAL_STATE.campos)
  const [alerta, setAlerta] = useAlerta()
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth)

  // Efecto de scroll al inicio
  useEffect(() => {
    // Scroll al inicio
    window.scrollTo(0, 0)
  }, [])

  // Efecto de error
  useEffect(() => {
    if (error) {
      setAlerta(error.code)
    }
  }, [error, setAlerta])

  // handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setCampos({ ...campos, [name]: value })
  }

  // handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (loading) return
    setAlerta('')

    // validar campos
    if (campos.email.trim() === '') {
      void Swal.fire({
        title: 'El email es obligatorio',
        icon: 'info',
        text: 'El email es obligatorio para iniciar sesión',
      })
      return
    }

    if (campos.password.trim() === '') {
      void Swal.fire({
        title: 'El password es obligatorio',
        icon: 'info',
        text: 'El password es obligatorio para iniciar sesión',
      })
      return
    }

    await signInWithEmailAndPassword(campos.email, campos.password)
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
          <Link className="" to="/">
            <ChevronLeftSvg />
            Volver
          </Link>
          <legend>Iniciar sesión</legend>
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

        <Link className="form__link form__link--right" to="/auth/recuperacion">
          ¿Olvidaste tu contraseña?
        </Link>

        <button className="form__button btn-primary" type="submit" disabled={loading}>
          {loading ? <LoaderSvg /> : 'Iniciar sesión'}
        </button>

        <div className="form__link">
          ¿No tienes cuenta?{' '}
          <Link className="form__link--right" to="/auth/register">
            Regístrate
          </Link>
        </div>
      </form>

      <RedesAuth />
    </>
  )
}

export default LoginPage
