const InformacionCitaItem = (): JSX.Element => {
  return (
    <div className="container">
      <div className="servicios__encabezado">
        <h2>Información de la cita</h2>
        <p>Ingrese la información de la cita</p>
      </div>

      <section className="layoutAuth__section">
        <form className="form">
          <div className="form__group">
            <label className="form__label" htmlFor="nombre">
              Nombre
            </label>
            <input type="text" name="nombre" id="nombre" placeholder="nombre" />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="fecha">
              Fecha
            </label>
            <input type="date" name="fecha" id="fecha" placeholder="fecha" />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="hora">
              Hora
            </label>
            <input type="time" name="hora" id="hora" placeholder="hora" />
          </div>
        </form>
      </section>
    </div>
  )
}

export default InformacionCitaItem
