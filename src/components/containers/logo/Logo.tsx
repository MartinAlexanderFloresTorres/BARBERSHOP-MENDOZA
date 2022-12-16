import { Link } from 'react-router-dom'

const Logo = (): JSX.Element => {
  return (
    <Link to={'/'} className="logo" title="Basbershop Mendoza">
      Basbershop <span>Mendoza</span>
    </Link>
  )
}

export default Logo
