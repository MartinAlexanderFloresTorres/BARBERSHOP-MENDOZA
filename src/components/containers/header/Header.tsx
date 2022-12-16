import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CarritoSvg,
  CloseSvg,
  ColeccionSvg,
  HomeSvg,
  LoginSvg,
  MenuSvg,
  SearchSvg,
  TijeraSvg,
  UserSvg,
} from '../../../assets/svg'
import Logo from '../logo/Logo'
import './Header.css'

const Header = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false)

  const handleShowMenu = (): void => {
    setShowMenu(!showMenu)
  }

  return (
    <>
      <header className="header">
        <section className="header__top container">
          <Logo />
          <button
            className="header__menu"
            onClick={handleShowMenu}
            title="Menu"
          >
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
            <Link to="/cortes" title="Cortes">
              <TijeraSvg />
              <span>Cortes</span>
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

        <section className="header__bottom">
          <div className="container">
            <h1 className="header__titulo">
              Bienvenidos a barbershop <br /> mendoza
            </h1>

            <p className="header__parrafo">
              Descubra y reserve profesionales de belleza más cercanos
            </p>
            <form className="header__formulario">
              <input type="text" placeholder="Buscar" />
              <button type="submit" className="title" title="Buscar">
                <SearchSvg />
              </button>
            </form>
            <Link className="header__reservar btn-primary" to="/citas">
              Reservar cita
            </Link>
          </div>
          <video
            className="header__video"
            src="/introduccion-2.mp4"
            autoPlay
            loop
            muted
          ></video>
          <div className="header__overlay"></div>
        </section>
      </header>
    </>
  )
}

export default Header
