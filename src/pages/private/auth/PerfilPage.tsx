import useMain from '../../../hooks/useMain'
import { LoaderSvg, UserSvg } from '../../../assets/svg'
import { Link } from 'react-router-dom'
import '../../../styles/PerfilPage.css'

const PerfilPage = (): JSX.Element => {
  // useMain
  const { user, loadingLogin } = useMain()

  if (loadingLogin) {
    return (
      <div className="loader__center">
        <LoaderSvg />
      </div>
    )
  }

  if (!user) {
    return (
      <section className="PerfilPage">
        <Link className="btn btn-primary" to="/auth/login">
          <UserSvg />
          <span>Iniciar sesion</span>
        </Link>
      </section>
    )
  }

  return (
    <section className="PerfilPage">
      <div className="PerfilPage__top">
        {user?.photoURL && (
          <img
            src={user.photoURL}
            onError={e => {
              const img = e.target as HTMLImageElement
              img.src = 'https://picsum.photos/200/300'
              console.warn('No se pudo cargar la imagen')
            }}
            alt={user?.displayName ?? 'usuario'}
          />
        )}

        <span>{user?.displayName}</span>
      </div>

      {user?.email && (
        <a className="PerfilPage__enlace" href={`mailto:${user?.email}`}>
          {user?.email}
        </a>
      )}
      {user?.phoneNumber && (
        <a className="PerfilPage__enlace" href={`tel:${user?.phoneNumber}`}>
          {user?.phoneNumber}
        </a>
      )}

      {user?.emailVerified ? <p className="verificado">Verificado</p> : <p className="no-verificado">No verificado</p>}
    </section>
  )
}

export default PerfilPage
