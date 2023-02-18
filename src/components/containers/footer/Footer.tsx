import { FacebookSvg, InstagramSvg, WhatsAppSvg } from '../../../assets/svg'
import './Footer.css'

const Footer = (): JSX.Element => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <section className="container">
        <div className="footer__flex">
          <h2 className="footer__logo">Barbershop</h2>
          <p className="footer__copy">© {year} Barbershop . Todos los derechos reservados</p>
        </div>
        <div className="footer__flex">
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
    </footer>
  )
}

export default Footer
