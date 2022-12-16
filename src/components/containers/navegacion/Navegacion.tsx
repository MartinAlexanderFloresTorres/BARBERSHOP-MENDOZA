import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  CarritoSvg,
  ColeccionSvg,
  HomeSvg,
  TijeraSvg,
} from '../../../assets/svg'
import './Navegacion.css'

const Navegacion = (): JSX.Element => {
  // Estados
  const [isVisible, setIsVisible] = useState(false)

  // useLocation
  const { pathname } = useLocation()

  // Handle is Visible
  const handleIsVisible = (): void => {
    if (window.scrollY > 80) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Efectos
  useEffect(() => {
    const showScroll = (): void => {
      handleIsVisible()
      document.addEventListener('scroll', () => {
        handleIsVisible()
      })
    }
    return () => showScroll()
  }, [])

  return (
    <>
      <section className={`navegacion ${isVisible ? 'visible' : ''} container`}>
        <div className="navegacion__links">
          <Link
            to={'/'}
            title="Inicio"
            className={pathname === '/' ? 'active' : ''}
          >
            <HomeSvg />
            <span>Inicio</span>
          </Link>
          <Link
            to={'/citas'}
            title="Citas"
            className={pathname === '/citas' ? 'active' : ''}
          >
            <ColeccionSvg />
            <span>Citas</span>
          </Link>
          <Link
            to={'/cortes'}
            title="Cortes"
            className={pathname === '/cortes' ? 'active' : ''}
          >
            <TijeraSvg />
            <span>Cortes</span>
          </Link>
          <Link
            to={'/carrito'}
            title="Carrito"
            className={pathname === '/carrito' ? 'active' : ''}
          >
            <CarritoSvg />
            <span>Carrito</span>
          </Link>
        </div>
      </section>

      <section
        className={`${isVisible ? 'navegacion_subVisible' : ''} navegacion_sub`}
      >
        <div className="container">
          <h2>Reservar cita</h2>

          <button className="btn-primary">Reservar Ahora</button>
        </div>
      </section>
    </>
  )
}

export default Navegacion
