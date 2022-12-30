import Barberos from '../../components/containers/barberos/Barberos'
import Presentacion from '../../components/containers/presentacion/Presentacion'
import Servicios from '../../components/containers/servicios/Servicios'

const HomePage = (): JSX.Element => {
  return (
    <>
      <Presentacion />
      <Servicios />
      <Barberos />
    </>
  )
}

export default HomePage
