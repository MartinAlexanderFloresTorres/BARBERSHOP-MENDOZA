import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HomeSvg, ShoppingCartSvg, TijeraSvg } from '../../../assets/svg'
import useMain from '../../../hooks/useMain'
import './Navegacion.css'

const Navegacion = (): JSX.Element => {
  // Estados
  const [isVisible, setIsVisible] = useState(false)

  // useLocation
  const { pathname } = useLocation()

  // useMain
  const { carrito } = useMain()

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
          <Link to={'/'} title="Inicio" className={pathname === '/' ? 'active' : ''}>
            <HomeSvg />
            <span>Inicio</span>
          </Link>
          <Link to={'/servicios'} title="Servicios" className={pathname === '/servicios' ? 'active' : ''}>
            <TijeraSvg />
            <span>Servicios</span>
          </Link>

          {carrito.length > 0 && (
            <Link to="/servicios/informacion" title="Informacion">
              <ShoppingCartSvg />
              <span>Continuar compra</span>
            </Link>
          )}
        </div>
      </section>

      {pathname !== '/servicios' && (
        <section className={`${isVisible ? 'navegacion_subVisible' : ''} navegacion_sub`}>
          <div className="container">
            <h2>Reservar cita</h2>

            <Link to={'/servicios'} className="btn-primary">
              Reservar Ahora
            </Link>
          </div>
        </section>
      )}
    </>
  )
}

export default Navegacion
