import useMain from '../../../hooks/useMain'
import Servicio from './servicios/Servicio'

const ServiciosItem = (): JSX.Element => {
  // useMain
  const { servicios } = useMain()

  return (
    <div>
      <div className="servicios__encabezado">
        <h2>Servicios</h2>
        <p>Elija los servicios que desea realizar</p>
      </div>

      <section className="servicios_servicios">
        {servicios.length > 0 &&
          servicios.map(servicio => (
            <Servicio key={servicio.id} servicio={servicio} resumen={false} />
          ))}
      </section>
    </div>
  )
}

export default ServiciosItem
