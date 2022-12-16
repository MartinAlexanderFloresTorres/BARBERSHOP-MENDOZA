import { Outlet } from 'react-router-dom'
import Header from '../components/containers/header/Header'
import Footer from '../components/containers/footer/Footer'
import SnowContainer from '../components/animations/SnowContainer'
import Navegacion from '../components/containers/navegacion/Navegacion'

const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <SnowContainer />
      <Outlet />
      <Navegacion />
      <Footer />
    </>
  )
}

export default Layout
