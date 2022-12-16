import { Outlet } from 'react-router-dom'
import SnowContainer from '../components/animations/SnowContainer'
import Logo from '../components/containers/logo/Logo'

const LayoutAuth = (): JSX.Element => {
  return (
    <>
      <SnowContainer />
      <section className="layoutAuth">
        <div className="layoutAuth__title">
          <Logo />
        </div>
        <section className="layoutAuth__section">
          <Outlet />
        </section>
      </section>
    </>
  )
}

export default LayoutAuth
