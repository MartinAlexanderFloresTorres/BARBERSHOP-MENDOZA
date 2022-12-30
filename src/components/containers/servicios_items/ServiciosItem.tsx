const ServiciosItem = (): JSX.Element => {
  return (
    <div className="container">
      <div className="servicios__encabezado">
        <h2>Servicios</h2>
        <p>Elija los servicios que desea realizar</p>
      </div>

      <section className="servicios_servicios">
        <article className="servicios_servicio selecionado">
          <img src="/servicios/servicio-1.jpg" alt="Servicio1" />
          <h2>Nombre del servicio</h2>
          <p>Descripción del servicio</p>
          <button className="btn-primary">Seleccionar</button>
          <span>S/.10.00</span>
        </article>

        <article className="servicios_servicio">
          <img src="/servicios/servicio-1.jpg" alt="Servicio1" />
          <h2>Nombre del servicio</h2>
          <p>Descripción del servicio</p>
          <button className="btn-primary">Seleccionar</button>
          <span>S/.10.00</span>
        </article>

        <article className="servicios_servicio">
          <img src="/servicios/servicio-1.jpg" alt="Servicio1" />
          <h2>Nombre del servicio</h2>
          <p>Descripción del servicio</p>
          <button className="btn-primary">Seleccionar</button>
          <span>S/.10.00</span>
        </article>

        <article className="servicios_servicio">
          <img src="/servicios/servicio-1.jpg" alt="Servicio1" />
          <h2>Nombre del servicio</h2>
          <p>Descripción del servicio</p>
          <button className="btn-primary">Seleccionar</button>
          <span>S/.10.00</span>
        </article>
      </section>
    </div>
  )
}

export default ServiciosItem
