import './Categorias.css'

const Categorias = (): JSX.Element => {
  return (
    <section className="categorias container">
      <div className="categorias__card">
        <h2>Cabello</h2>
        <p>Es la esencia de nuestro salón. Nuestros técnicos especializados valorarán la forma más adecuada para crear, mantener o renovar tu imagen.</p>
      </div>

      <div className="categorias__card">
        <h2>Barba</h2>
        <p>Sin duda, el mejor afeitado de Madrid. Nuestro afeitado es la mezcla perfecta de la tradición y las nuevas tecnologías.</p>
      </div>

      <div className="categorias__card">
        <h2>Piel</h2>
        <p>Nuestros tratamientos faciales están diseñados para mejorar la salud y el aspecto de la piel. Nuestros técnicos especializados valorarán la forma más adecuada para crear, mantener o renovar tu imagen.</p>
      </div>
    </section>
  )
}

export default Categorias
