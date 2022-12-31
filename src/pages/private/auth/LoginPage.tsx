import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import RedesAuth from '../../../components/containers/redes/RedesAuth'
import { ChevronLeftSvg } from '../../../assets/svg'

const LoginPage = (): JSX.Element => {
  // Efecto de scroll al inicio
  useEffect(() => {
    // Scroll al inicio
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <form className="form">
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
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>

        <Link className="form__link form__link--right" to="/auth/recuperacion">
          ¿Olvidaste tu contraseña?
        </Link>

        <button className="form__button btn-primary" type="submit">
          Iniciar sesión
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
