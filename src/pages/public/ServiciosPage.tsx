import { Fragment, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ServiciosItem from '../../components/containers/servicios_items/ServiciosItem'
import InformacionCitaItem from '../../components/containers/servicios_items/InformacionCitaItem'
import ResumenItem from '../../components/containers/servicios_items/ResumenItem'
import useMain from '../../hooks/useMain'
import useAuth from '../../hooks/useAuth'
import RedesAuth from '../../components/containers/redes/RedesAuth'
import {
  ChevronLeftSvg,
  ChevronRigthtSvg,
  MailSvg,
  ShoppingCartSvg,
} from '../../assets/svg'
import '../../styles/ServiciosPage.css'

const ServiciosPage = (): JSX.Element => {
  // useMain
  const { carrito, item, changeItem } = useMain()

  // useLocation para obtener la ruta actual
  const location = useLocation()

  // useNavigate
  const navigate = useNavigate()

  // useAuth
  const auth = useAuth()

  // Efecto de cambio de item
  useEffect(() => {
    // Scroll al inicio
    window.scrollTo(0, 0)
    // Si el carrito esta vacio, cambiar a item 1
    if (carrito.length === 0) {
      changeItem(1)
    }
  }, [])

  return (
    <section className="serviciosPage container">
      <section className="servicios__grid">
        <div className="servicios__navegacion">
          <button
            className={item === 1 ? 'active' : ''}
            onClick={() => changeItem(1)}
          >
            Servicios
          </button>
          <button
            className={item === 2 ? 'active' : ''}
            onClick={() => changeItem(2)}
          >
            Información citas
          </button>
          <button
            className={item === 3 ? 'active' : ''}
            onClick={() => changeItem(3)}
          >
            Resumen {carrito.length > 0 && `(${carrito.length})`}
          </button>
        </div>

        {item === 1 ? (
          <ServiciosItem />
        ) : item === 2 ? (
          <InformacionCitaItem />
        ) : (
          <ResumenItem />
        )}

        <div className="servicios__botones">
          {item === 1 ? (
            <button onClick={() => changeItem(2)} className="btn-primary">
              <span>Siguiente</span>
              <ChevronRigthtSvg />
            </button>
          ) : item === 2 ? (
            <>
              <button onClick={() => changeItem(1)} className="btn-primary">
                <ChevronLeftSvg />
                <span>Anterior</span>
              </button>
              <button onClick={() => changeItem(3)} className="btn-primary">
                <span>Siguiente</span>
                <ChevronRigthtSvg />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => changeItem(2)} className="btn-primary">
                <ChevronLeftSvg />
                <span>Anterior</span>
              </button>

              {carrito.length > 0 && auth && (
                <button className="btn-black">
                  Reservar Cita
                  <ShoppingCartSvg />
                </button>
              )}

              {!auth && (
                <section className="servicios__auth">
                  <button
                    className="btn-black"
                    onClick={() => navigate('/auth/login', { state: location })}
                  >
                    Debes iniciar sesión
                  </button>

                  <section className="servicios__authContainer">
                    <button
                      className="btn-primary"
                      onClick={() =>
                        navigate('/auth/login', { state: location })
                      }
                    >
                      Email <MailSvg />
                    </button>
                    <RedesAuth />
                  </section>
                </section>
              )}
            </>
          )}
        </div>
      </section>
    </section>
  )
}

export default ServiciosPage
