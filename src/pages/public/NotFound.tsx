import { Link } from 'react-router-dom'
import SnowContainer from '../../components/animations/SnowContainer'

const NotFound = (): JSX.Element => {
  return (
    <>
      <div className="container NotFound">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>

      <SnowContainer />
    </>
  )
}

export default NotFound
