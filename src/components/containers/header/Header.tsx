import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CarritoSvg,
  CloseSvg,
  ColeccionSvg,
  FacebookSvg,
  HomeSvg,
  InstagramSvg,
  LoginSvg,
  MenuSvg,
  SearchSvg,
  TijeraSvg,
  UserSvg,
  WhatsAppSvg,
} from '../../../assets/svg'
import Logo from '../logo/Logo'
import './Header.css'

const Header = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false)

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
          <Link to="/" title="Inicio">
            <HomeSvg />
            <span>Inicio</span>
          </Link>
          <Link to="/citas" title="Citas">
            <ColeccionSvg />
            <span>Citas</span>
          </Link>
          <Link to="/servicios" title="servicios">
            <TijeraSvg />
            <span>servicios</span>
          </Link>
          <Link to="/carrito" title="Carrito">
            <CarritoSvg />
            <span>Carrito</span>
          </Link>

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
