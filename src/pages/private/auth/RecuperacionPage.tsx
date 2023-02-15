import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeftSvg } from '../../../assets/svg'
import Swal from 'sweetalert2'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase'
import useAlerta from '../../../hooks/useAlerta'

const RecuperacionPage = (): JSX.Element => {
  // Estados
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useAlerta()
  const [sendPasswordResetEmail, loading, error] = useSendPasswordResetEmail(auth)

  // useNavigate
  const navigate = useNavigate()

  // Efecto de scroll al inicio
  useEffect(() => {
    // Scroll al inicio
    window.scrollTo(0, 0)
  }, [])

  // Efecto de error
  useEffect(() => {
    if (error) {
      const code = error as { code: string }

      setAlerta(code.code)
    }
  }, [error, setAlerta])

  // handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setAlerta('')
    if (loading) return

    // validar campos
    if (email.trim() === '') {
      void Swal.fire({
        title: 'El email es obligatorio',
        icon: 'info',
        text: 'El email es obligatorio para recuperar la cuenta',
      })
      return
    }

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await sendPasswordResetEmail(email, { url: `${import.meta.env.VITE_FRONTEND_URL}/auth/login` })
    setEmail('')
    void Swal.fire({
      title: 'Email enviado',
      icon: 'success',
      text: 'Se ha enviado un email con las instrucciones para recuperar la cuenta',
    })

    navigate('/auth/login')
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
          <legend>Récuperación</legend>
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value.trim())} id="email" placeholder="Email" />
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
    </>
  )
}

export default RecuperacionPage
