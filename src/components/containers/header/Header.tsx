import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  CloseSvg,
  ColeccionSvg,
  LoaderSvg,
  LoginSvg,
  LogoutSvg,
  MenuSvg,
  ShoppingCartSvg,
  TijeraSvg,
  UserSvg,
} from '../../../assets/svg'
import Logo from '../logo/Logo'
import useMain from '../../../hooks/useMain'
import useAuth from '../../../hooks/useAuth'
import { useSignOut } from 'react-firebase-hooks/auth'
import { auth as authApp } from '../../../firebase'
import './Header.css'

const Header = (): JSX.Element => {
  // Estado para mostrar el menu
  const [showMenu, setShowMenu] = useState(false)

  // useSignOut
  const [signOut, loadingOut] = useSignOut(authApp)

  // useMain
  const { user, rol, loadingLogin, carrito, changeItem } = useMain()

  // useAuth
  const auth = useAuth()

  // useLocation para obtener la ruta actual
  const location = useLocation()
  const { pathname } = location

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

  return (
    <header className="header">
      <section className="header__top container">
        <Logo />
        <button className="header__menu" onClick={handleShowMenu} title="Menu">
          {showMenu ? <CloseSvg /> : <MenuSvg />}
        </button>

        <nav className={`header__navegacion ${showMenu ? 'open' : ''}`}>
          {rol === 'admin' && (
            <Link to="/admin" title="Admin">
              <ColeccionSvg />
              <span>Panel Administrador</span>
            </Link>
          )}

          {pathname !== '/servicios' && (
            <Link
              to="/servicios"
              title="servicios"
              onClick={() => changeItem(1)}
            >
              <TijeraSvg />
              <span>servicios</span>
            </Link>
          )}

          {carrito.length > 0 && (
            <Link to="/servicios" title="Resumen" onClick={() => changeItem(3)}>
              <ShoppingCartSvg />
              <span>Continuar compra</span>
            </Link>
          )}

          {loadingLogin ? (
            <LoaderSvg />
          ) : auth ? (
            <>
              <Link to="/auth/profile" title="Perfil">
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

              <button
                title="Cerrar Sesion"
                onClick={handleSignOut}
                disabled={loadingOut}
              >
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
      </section>
    </header>
  )
}

export default Header
