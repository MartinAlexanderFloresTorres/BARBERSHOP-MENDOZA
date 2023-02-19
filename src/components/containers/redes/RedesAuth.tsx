/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import useAlerta from '../../../hooks/useAlerta'
import { FacebookSvg, GithubSvg, GoogleSvg, LoaderSvg } from '../../../assets/svg'

const RedesAuth = (): JSX.Element => {
  // Auth Google
  const [signInWithGoogle, , loadingGoogle, errorGoogle] = useSignInWithGoogle(auth)

  // Auth Facebook
  const [signInWithFacebook, , loadingFacebook, errorFacebook] = useSignInWithFacebook(auth)

  // Auth GitHub
  const [signInWithGithub, , loadingGithub, errorGithub] = useSignInWithGithub(auth)

  // useAlerta
  const [alerta, setAlerta] = useAlerta()

  // useLocation
  const { state, pathname } = useLocation()

  // useNavigate
  const navigate = useNavigate()

  // Efecto de redireccionamiento
  onAuthStateChanged(auth, userFirebase => {
    if (userFirebase) {
      if (state) {
        navigate(state.pathname)
      } else if (pathname !== '/auth/login') navigate('/')
    }
  })

  // Efecto de alerta
  useEffect(() => {
    const errorCode = errorGoogle?.code ?? errorFacebook?.code ?? errorGithub?.code
    if (errorCode) {
      setAlerta(errorCode)
    }
  }, [errorGoogle, errorFacebook, errorGithub])

  return (
    <>
      {alerta && <p className="alerta">{alerta}</p>}
      <section className="form__redes">
        <button title="Google" onClick={async () => await signInWithGoogle()} disabled={loadingGoogle}>
          {loadingGoogle ? <LoaderSvg /> : <GoogleSvg />}
        </button>
        <button title="Facebook" onClick={async () => await signInWithFacebook()} disabled={loadingFacebook}>
          {loadingFacebook ? <LoaderSvg /> : <FacebookSvg />}
        </button>
        <button title="GitHub" onClick={async () => await signInWithGithub()} disabled={loadingGithub}>
          {loadingGithub ? <LoaderSvg /> : <GithubSvg />}
        </button>
      </section>
    </>
  )
}

export default RedesAuth
