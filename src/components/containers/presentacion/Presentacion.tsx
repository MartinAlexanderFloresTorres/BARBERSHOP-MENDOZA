import { FacebookSvg, InstagramSvg, WhatsAppSvg } from '../../../assets/svg'
import './Presentacion.css'

const Presentacion = (): JSX.Element => {
  return (
    <section className="presentacion">
      <div className="container"></div>

      <div className="presentacion__redes">
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
  )
}

export default Presentacion
