import { Link } from 'react-router-dom'
import { ChevronLeftSvg } from '../../../assets/svg'

const RegisterPage = (): JSX.Element => {
  return (
    <form className="form">
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
          <input type="text" name="nombre" id="nombre" placeholder="Nombre" />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="apellidos">
            Apellido
          </label>
          <input
            type="text"
            name="apellidos"
            id="apellidos"
            placeholder="Apellido"
          />
        </div>
      </div>

      <div className="form__group">
        <label className="form__label" htmlFor="telefono">
          Teléfono
        </label>
        <input
          type="text"
          name="telefono"
          id="telefono"
          placeholder="Teléfono"
        />
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

      <div className="form__group">
        <label className="form__label" htmlFor="password2">
          Repetir password
        </label>
        <input
          type="password"
          name="password2"
          id="password2"
          placeholder="Repetir password"
        />
      </div>

      <button className="form__button btn-primary" type="submit">
        Registrarse
      </button>

      <div className="form__link">
        ¿Ya tienes cuenta?{' '}
        <Link className="form__link--right" to="/auth/login">
          Inicia sesión
        </Link>
      </div>
    </form>
  )
}

export default RegisterPage
