import { Link } from 'react-router-dom'

const Logo = (): JSX.Element => {
  return (
    <Link to={'/'} className="logo" title="Basbershop Mendoza">
      <img src="/logo.png" alt="logo" />
      Basbershop
    </Link>
  )
}

export default Logo
