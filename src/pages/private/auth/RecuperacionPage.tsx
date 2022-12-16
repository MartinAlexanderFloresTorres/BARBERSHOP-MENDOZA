import { Link } from 'react-router-dom'
import { ChevronLeftSvg } from '../../../assets/svg'

const RecuperacionPage = (): JSX.Element => {
  return (
    <form className="form">
      <div className="form__cabezera">
        <Link className="" to="/auth/login">
          <ChevronLeftSvg />
          Volver
        </Link>
        <legend>Récuperación</legend>
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input type="email" name="email" id="email" placeholder="Email" />
      </div>

      <button className="form__button btn-primary" type="submit">
        Enviar instrucciones
      </button>

      <div className="form__link">
        ¿Crear cuenta?{' '}
        <Link className="form__link--right" to="/auth/register">
          Regístrate
        </Link>
      </div>
    </form>
  )
}

export default RecuperacionPage
