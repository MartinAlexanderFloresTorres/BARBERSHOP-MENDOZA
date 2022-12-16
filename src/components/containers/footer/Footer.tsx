import { FacebookSvg, InstagramSvg, WhatsAppSvg } from '../../../assets/svg'
import './Footer.css'

const Footer = (): JSX.Element => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <section className="container">
        <div className="footer__flex">
          <h2 className="footer__logo">Barbershop</h2>
          <p className="footer__copy">
            © {year} Barbershop . Todos los derechos reservados
          </p>
        </div>
        <div className="footer__flex">
          <a href="#" title="Instagram" className="title">
            <InstagramSvg />
          </a>
          <a href="#" title="Facebook" className="title">
            <FacebookSvg />
          </a>

          <a href="#" title="WhatsApp" className="title">
            <WhatsAppSvg />
          </a>
        </div>
      </section>
    </footer>
  )
}

export default Footer
