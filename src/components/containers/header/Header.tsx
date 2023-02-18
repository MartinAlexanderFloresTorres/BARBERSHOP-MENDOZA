import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CloseSvg, ColeccionSvg, LoaderSvg, LoginSvg, LogoutSvg, MenuSvg, ShoppingCartSvg, TijeraSvg, UserSvg } from '../../../assets/svg'
import Logo from '../logo/Logo'
import useMain from '../../../hooks/useMain'
import useAuth from '../../../hooks/useAuth'
import { useSignOut } from 'react-firebase-hooks/auth'
import { auth as authApp } from '../../../firebase'
import './Header.css'

const Header = (): JSX.Element => {
  // Estado para mostrar el menu
  const [showMenu, setShowMenu] = useState(false)
  const [isSubHeader, setIsSubHeader] = useState(false)

  // useSignOut
  const [signOut, loadingOut] = useSignOut(authApp)

  // useEffect para el scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // useMain
  const { user, rol, loadingLogin, carrito } = useMain()

  // useAuth
  const auth = useAuth()

  // useLocation para obtener la ruta actual
  const location = useLocation()

  // Funcion para mostrar el menu
  const handleShowMenu = (): void => {
    setShowMenu(!showMenu)
  }

  // cerrar sesion
  const handleSignOut = (): void => {
    signOut().catch(error => {
      console.log(error)
    })
  }

  // handleScroll
  const handleScroll = (): void => {
    const scroll = window.scrollY
    if (scroll > 100) {
      setIsSubHeader(true)
    } else {
      setIsSubHeader(false)
    }
  }

  return (
    <>
      <header className="header">
        <section className="header__top container">
          <Logo />

          <div className="header__flex">
            <nav className={`header__navegacion ${showMenu ? 'open' : ''}`}>
              {rol === 'admin' && (
                <Link to="/admin" title="Admin" state={location}>
                  <ColeccionSvg />
                  <span>Administrador</span>
                </Link>
              )}

              <Link to="/servicios" title="servicios">
                <TijeraSvg />
                <span>servicios</span>
              </Link>

              {loadingLogin ? (
                <LoaderSvg />
              ) : auth ? (
                <>
                  <Link to="/auth/perfil" title="Perfil">
                    {user?.photoURL ? (
                      <img
                        className="header__photoURL"
                        src={user?.photoURL}
                        onError={e => {
                          const img = e.target as HTMLImageElement
                          img.src = 'https://picsum.photos/200/300'
                          console.warn('No se pudo cargar la imagen')
                        }}
                        alt={user?.displayName ?? 'usuario'}
                      />
                    ) : (
                      <UserSvg />
                    )}
                    <span className="header__displayName">{user?.displayName}</span>
                  </Link>

                  <button title="Cerrar Sesion" onClick={handleSignOut} disabled={loadingOut}>
                    {loadingOut ? (
                      <LoaderSvg />
                    ) : (
                      <>
                        <LogoutSvg />
                        <span>Cerrar Sesion</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth/login" state={location} title="Login">
                    <LoginSvg />
                    <span>Login</span>
                  </Link>

                  <Link to="/auth/register" title="Registrarse">
                    <UserSvg />
                    <span>Registrarse</span>
                  </Link>
                </>
              )}
            </nav>

            <div className="header__flex">
              {carrito.length > 0 && (
                <Link className="header__card" to="/servicios" title="Resumen">
                  <ShoppingCartSvg /> <span>{carrito.length}</span>
                </Link>
              )}

              <button className="header__menu" onClick={handleShowMenu} title="Menu">
                {showMenu ? <CloseSvg /> : <MenuSvg />}
              </button>
            </div>
          </div>
        </section>
      </header>

      <header className={`header__sub ${isSubHeader ? 'visible' : ''}`}>
        <section className="header__top container">
          <Logo />

          <Link to="/servicios" className="btn btn-primary" title="servicios">
            Reservar cita
          </Link>
        </section>
      </header>
    </>
  )
}

export default Header
