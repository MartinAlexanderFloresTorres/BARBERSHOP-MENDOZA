import './Servicios.css'

const Servicios = (): JSX.Element => {
  return (
    <section className="servicios container">
      <div className="servicios__card">
        <h2>Cabello</h2>
        <p>
          Es la esencia de nuestro salón. Nuestros técnicos especializados
          valorarán la forma más adecuada para crear, mantener o renovar tu
          imagen.
        </p>
        <a className="btn-black" href="#">
          Ver Cortes
        </a>
      </div>

      <div className="servicios__card">
        <h2>Barba</h2>
        <p>
          Sin duda, el mejor afeitado de Madrid. Nuestro afeitado es la mezcla
          perfecta de la tradición y las nuevas tecnologías.
        </p>

        <a className="btn-black" href="#">
          Ver Barbas
        </a>
      </div>

      <div className="servicios__card">
        <h2>Piel</h2>
        <p>
          Nuestros tratamientos faciales están diseñados para mejorar la salud y
          el aspecto de la piel. Nuestros técnicos especializados valorarán la
          forma más adecuada para crear, mantener o renovar tu imagen.
        </p>

        <a className="btn-black" href="#">
          Ver Tratamientos
        </a>
      </div>
    </section>
  )
}

export default Servicios
