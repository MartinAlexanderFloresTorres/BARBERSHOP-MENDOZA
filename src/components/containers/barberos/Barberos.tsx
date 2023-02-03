import { LoaderSvg } from '../../../assets/svg'
import useMain from '../../../hooks/useMain'
import Barbero from './Barbero'
import './Barberos.css'

const Barberos = (): JSX.Element => {
  // useMain
  const { barberos, loadingBarbero } = useMain()

  return (
    <section className="barberos">
      <img className="barberos__tool1" src="/barberos/tools-1.png" alt="Tools" />
      <img className="barberos__tool2" src="/barberos/tools-2.png" alt="Tools" />
      <div className="container">
        <div className="barberos__top">
          <h2>CONOCE A NUESTROS Barberos</h2>
          <p>Profesionales que conocen bien a cada cliente y que tratan el cabello con arte, oficio y esmero.</p>
        </div>
        {loadingBarbero ? (
          <div className="loader__center">
            <LoaderSvg />
          </div>
        ) : (
          <div className="barberos__bottom">{barberos.length > 0 ? barberos.map(barbero => <Barbero key={barbero.id} barbero={barbero} />) : <div className="alerta">No hay barberos</div>}</div>
        )}
      </div>
    </section>
  )
}

export default Barberos
