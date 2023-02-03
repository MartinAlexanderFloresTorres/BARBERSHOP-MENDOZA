import { Outlet, useLocation, Navigate } from 'react-router-dom'
import SnowContainer from '../components/animations/SnowContainer'
import Asidebar from '../components/containers/admin/asidebar/Asidebar'
import HeaderAdminTop from '../components/containers/admin/header/HeaderAdminTop'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import useMain from '../hooks/useMain'
import { LoaderSvg } from '../assets/svg'

const LayoutAdmin = (): JSX.Element => {
  // Estado para mostrar el menu
  const [showMenu, setShowMenu] = useState(false)

  // useLocation para obtener la ruta actual
  const location = useLocation()

  // useMain
  const { rol, loadingRol, loadingLogin } = useMain()

  // useAuth
  const auth = useAuth()

  if (loadingLogin) return <></>

  // Funcion para mostrar el menu
  const handleShowMenu = (): void => {
    setShowMenu((prev: boolean) => !prev)
  }

  return auth ? (
    <>
      <section className={'headerAdmin__aside'}>
        <HeaderAdminTop handleShowMenu={handleShowMenu} showMenu={showMenu} />

        {loadingRol ? (
          <div className="loader__center">
            <LoaderSvg />
          </div>
        ) : (
          rol === 'admin' && (
            <main className="headerAdmin__main">
              <Outlet />
            </main>
          )
        )}
      </section>
      <SnowContainer />
    </>
  ) : (
    <Navigate to="/auth/login" state={location} />
  )
}

export default LayoutAdmin
