const ResumenItem = (): JSX.Element => {
  return (
    <div className="container">
      <div className="servicios__encabezado">
        <h2>Resumen</h2>
        <p>Resumen de la cita</p>
      </div>

      <section className="servicios__resumen servicios_servicios">
        <article className="servicios__resumen-item servicios_servicio">
          <img src="/servicios/servicio-1.jpg" alt="Servicio1" />
          <h2>Nombre del servicio</h2>
          <p>Descripción del servicio</p>
          <span>S/.10.00</span>
        </article>

        <article className="servicios__resumen-item servicios_servicio">
          <img src="/servicios/servicio-1.jpg" alt="Servicio1" />
          <h2>Nombre del servicio</h2>
          <p>Descripción del servicio</p>
          <span>S/.10.00</span>
        </article>

        <article className="servicios__resumen-item servicios_servicio">
          <img src="/servicios/servicio-1.jpg" alt="Servicio1" />
          <h2>Nombre del servicio</h2>
          <p>Descripción del servicio</p>
          <span>S/.10.00</span>
        </article>

        <article className="servicios__resumen-item servicios_servicio">
          <img src="/servicios/servicio-1.jpg" alt="Servicio1" />
          <h2>Nombre del servicio</h2>
          <p>Descripción del servicio</p>
          <span>S/.10.00</span>
        </article>
      </section>
    </div>
  )
}

export default ResumenItem
