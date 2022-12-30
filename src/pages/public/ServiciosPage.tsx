import { useState } from 'react'
import ServiciosItem from '../../components/containers/servicios_items/ServiciosItem'
import InformacionCitaItem from '../../components/containers/servicios_items/InformacionCitaItem'
import ResumenItem from '../../components/containers/servicios_items/ResumenItem'
import { ChevronLeftSvg, ChevronRigthtSvg } from '../../assets/svg'
import '../../styles/ServiciosPage.css'

const ServiciosPage = (): JSX.Element => {
  const [item, setItem] = useState<Number>(1)

  return (
    <section className="servicios">
      <img className="servicios__banner" src={'/Banner.jpg'} alt="Banner" />

      <section className="servicios__contenido">
        <div className="servicios__navegacion">
          <button
            className={item === 1 ? 'active' : ''}
            onClick={() => setItem(1)}
          >
            Servicios
          </button>
          <button
            className={item === 2 ? 'active' : ''}
            onClick={() => setItem(2)}
          >
            Información citas
          </button>
          <button
            className={item === 3 ? 'active' : ''}
            onClick={() => setItem(3)}
          >
            Resumen
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
            <button onClick={() => setItem(2)} className="btn-primary">
              Siguiente
              <ChevronRigthtSvg />
            </button>
          ) : item === 2 ? (
            <>
              <button onClick={() => setItem(1)} className="btn-primary">
                <ChevronLeftSvg />
                Anterior
              </button>
              <button onClick={() => setItem(3)} className="btn-primary">
                Siguiente
                <ChevronRigthtSvg />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setItem(2)} className="btn-primary">
                <ChevronLeftSvg />
                Anterior
              </button>
              <button className="btn-primary">Reservar Cita</button>
            </>
          )}
        </div>
      </section>
    </section>
  )
}

export default ServiciosPage
