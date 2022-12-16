import './Barberos.css'

const Barberos = (): JSX.Element => {
  return (
    <section className="barberos">
      <img
        className="barberos__tool1"
        src="/barberos/tools-1.png"
        alt="Tools"
      />
      <img
        className="barberos__tool2"
        src="/barberos/tools-2.png"
        alt="Tools"
      />
      <div className="container">
        <div className="barberos__top">
          <h2>CONOCE A NUESTROS Barberos</h2>
          <p>
            Profesionales que conocen bien a cada cliente y que tratan el
            cabello con arte, oficio y esmero.
          </p>
        </div>

        <div className="barberos__bottom">
          <div className="barberos__item">
            <div className="barberos__imagen misterioso">
              <img src="/barberos/misterio.webp" alt="Barbero misterioso" />
            </div>
            <div className="barberos__info">
              <h3 className="title" title="Muy pronto">
                Barbero misterioso
              </h3>
              <p>?</p>
            </div>
          </div>

          <div className="barberos__item">
            <div className="barberos__imagen">
              <img
                src="/barberos/barbero-principal.webp"
                alt="Barbero Richard mendoza"
              />
            </div>
            <div className="barberos__info">
              <h3 className="title" title="Barbero Profesional">
                Richard mendoza
              </h3>
              <p>
                Barbero / Peluquero / Estilista / Maquillador / Diseñador de
                cejas
              </p>
            </div>
          </div>

          <div className="barberos__item">
            <div className="barberos__imagen misterioso">
              <img src="/barberos/misterio.webp" alt="Barbero misterioso" />
            </div>
            <div className="barberos__info">
              <h3 className="title" title="Muy pronto">
                Barbero misterioso
              </h3>
              <p>?</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Barberos
