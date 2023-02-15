import { Outlet, useLocation, Navigate } from 'react-router-dom'
import SnowContainer from '../components/animations/SnowContainer'
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

  if (loadingLogin) {
    return (
      <div className="loader__center">
        <LoaderSvg />
      </div>
    )
  }

  // Funcion para mostrar el menu
  const handleShowMenu = (): void => {
    setShowMenu((prev: boolean) => !prev)
  }

  if (!auth) {
    return <Navigate to="/auth/login" state={location} />
  }

  if (loadingRol) {
    return (
      <div className="loader__center">
        <LoaderSvg />
      </div>
    )
  }

  return (
    <>
      <section className={'headerAdmin__aside'}>
        {rol === 'admin' ? (
          <>
            <HeaderAdminTop handleShowMenu={handleShowMenu} showMenu={showMenu} />
            <main className="headerAdmin__main">
              <Outlet />
            </main>
          </>
        ) : (
          <Navigate to="/" state={location} />
        )}
      </section>
      <SnowContainer />
    </>
  )
}

export default LayoutAdmin
