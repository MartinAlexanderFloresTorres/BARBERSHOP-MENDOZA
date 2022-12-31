import {
  FacebookSvg,
  GithubSvg,
  GoogleSvg,
  LoaderSvg,
} from '../../../assets/svg'
import {
  useSignInWithFacebook,
  useSignInWithGithub,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase'
import useAlerta from '../../../hooks/useAlerta'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RedesAuth = (): JSX.Element => {
  // Auth Google
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth)

  // Auth Facebook
  const [signInWithFacebook, userFacebook, loadingFacebook, errorFacebook] =
    useSignInWithFacebook(auth)

  // Auth GitHub
  const [signInWithGithub, userGithub, loadingGithub, errorGithub] =
    useSignInWithGithub(auth)

  // useAlerta
  const [alerta, setAlerta] = useAlerta()

  // useLocation
  const { state } = useLocation()

  // useNavigate
  const navigate = useNavigate()

  // Efecto de alerta
  useEffect(() => {
    const errorCode =
      errorGoogle?.code || errorFacebook?.code || errorGithub?.code
    if (errorCode) {
      setAlerta(errorCode)
    }
  }, [errorGoogle, errorFacebook, errorGithub])

  // Efecto de usuario
  useEffect(() => {
    if (userGoogle || userFacebook || userGithub) {
      if (state?.pathname) {
        navigate(state.pathname)
      } else {
        navigate('/')
      }
    }
  }, [userGoogle, userFacebook, userGithub])

  return (
    <>
      {alerta && <p className="alerta">{alerta}</p>}
      <section className="form__redes">
        <button
          title="Google"
          onClick={() => signInWithGoogle()}
          disabled={loadingGoogle}
        >
          {loadingGoogle ? <LoaderSvg /> : <GoogleSvg />}
        </button>
        <button title="Facebook" onClick={() => signInWithFacebook()}>
          {loadingFacebook ? <LoaderSvg /> : <FacebookSvg />}
        </button>
        <button title="GitHub" onClick={() => signInWithGithub()}>
          {loadingGithub ? <LoaderSvg /> : <GithubSvg />}
        </button>
      </section>
    </>
  )
}

export default RedesAuth
