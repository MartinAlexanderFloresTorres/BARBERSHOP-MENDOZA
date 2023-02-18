import { Link } from 'react-router-dom'
import { FacebookSvg, InstagramSvg, WhatsAppSvg } from '../../../assets/svg'
import './Presentacion.css'

const Presentacion = (): JSX.Element => {
  return (
    <section className="presentacion">
      <div className="container">
        <h1 className="presentacion__titulo">
          Bienvenidos a barbershop <br /> mendoza
        </h1>

        <p className="presentacion__parrafo">Descubra y reserve profesionales de belleza más cercanos</p>
        <Link to="/servicios" className="presentacion__reservar btn-primary">
          Reservar cita
        </Link>
      </div>

      <video className="presentacion__video" src="/introduccion-2.mp4" autoPlay loop muted></video>

      <div className="presentacion__overlay"></div>

      <section className="redes">
        <div className="container"></div>

        <div className="redes__redes">
          <a href={import.meta.env.VITE_FACEBOOK} className="title" title="Facebook">
            <FacebookSvg />
          </a>
          <a href={import.meta.env.VITE_INSTAGRAM} className="title" title="Instagram">
            <InstagramSvg />
          </a>
          <a href={import.meta.env.VITE_WHATSAPP} className="title" title="WhatsApp">
            <WhatsAppSvg />
          </a>
        </div>
      </section>
    </section>
  )
}

export default Presentacion
