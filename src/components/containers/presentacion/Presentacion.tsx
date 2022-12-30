import { Link } from 'react-router-dom'
import {
  FacebookSvg,
  InstagramSvg,
  SearchSvg,
  WhatsAppSvg,
} from '../../../assets/svg'
import './Presentacion.css'

const Presentacion = (): JSX.Element => {
  return (
    <section className="presentacion">
      <div className="container">
        <h1 className="presentacion__titulo">
          Bienvenidos a barbershop <br /> mendoza
        </h1>

        <p className="presentacion__parrafo">
          Descubra y reserve profesionales de belleza más cercanos
        </p>
        <form className="presentacion__formulario">
          <input type="text" placeholder="Buscar" />
          <button type="submit" className="title" title="Buscar">
            <SearchSvg />
          </button>
        </form>
        <Link className="presentacion__reservar btn-primary" to="/citas">
          Reservar cita
        </Link>
      </div>

      <video
        className="presentacion__video"
        src="/introduccion-2.mp4"
        autoPlay
        loop
        muted
      ></video>

      <div className="presentacion__overlay"></div>

      <section className="redes">
        <div className="container"></div>

        <div className="redes__redes">
          <a href="#" className="title" title="Facebook">
            <FacebookSvg />
          </a>
          <a href="#" className="title" title="Instagram">
            <InstagramSvg />
          </a>
          <a href="#" className="title" title="WhatsApp">
            <WhatsAppSvg />
          </a>
        </div>
      </section>
    </section>
  )
}

export default Presentacion
