import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  CloseSvg,
  LoginSvg,
  MenuSvg,
  ShoppingCartSvg,
  TijeraSvg,
  UserSvg,
} from '../../../assets/svg'
import Logo from '../logo/Logo'
import './Header.css'
import useMain from '../../../hooks/useMain'

const Header = (): JSX.Element => {
  // Estado para mostrar el menu
  const [showMenu, setShowMenu] = useState(false)

  // useMain
  const { carrito, changeItem } = useMain()

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

          <Link to="/auth/login" title="Login">
            <LoginSvg />
            <span>Login</span>
          </Link>

          <Link to="/auth/register" title="Register">
            <UserSvg />
            <span>Register</span>
          </Link>
        </nav>
      </section>
    </header>
  )
}

export default Header
