import useMain from '../../../hooks/useMain'
import Servicio from './servicios/Servicio'

const ResumenItem = (): JSX.Element => {
  // useMain
  const { carrito } = useMain()

  return (
    <div>
      <div className="servicios__encabezado">
        <h2>Resumen</h2>
        <p>Resumen de la cita</p>
      </div>

      <section className="servicios__resumen servicios_servicios">
        {carrito.length > 0 ? (
          carrito.map(servicio => (
            <Servicio key={servicio.id} servicio={servicio} resumen={true} />
          ))
        ) : (
          <p className="alerta">No hay servicios seleccionados</p>
        )}
      </section>
    </div>
  )
}

export default ResumenItem
