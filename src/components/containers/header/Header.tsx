import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  CloseSvg,
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
  const { user, loadingLogin, carrito, changeItem } = useMain()

  // useAuth
  const auth = useAuth()

  // useLocation para obtener la ruta actual
  const { pathname } = useLocation()

  // Funcion para mostrar el menu
  const handleShowMenu = (): void => {
    setShowMenu(!showMenu)
  }

  return (
    <header className="header">
      <section className="header__top container">
        <Logo />
        <button className="header__menu" onClick={handleShowMenu} title="Menu">
          {showMenu ? <CloseSvg /> : <MenuSvg />}
        </button>

        <nav className={`header__navegacion ${showMenu ? 'open' : ''}`}>
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
                <UserSvg />
                <span>{user?.displayName}</span>
              </Link>

              <button
                title="Cerrar Sesion"
                onClick={() => signOut()}
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
              <Link to="/auth/login" title="Login">
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
