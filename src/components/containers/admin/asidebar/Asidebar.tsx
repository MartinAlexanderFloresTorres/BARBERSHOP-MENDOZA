import { Link, useLocation } from 'react-router-dom'
import { useSignOut } from 'react-firebase-hooks/auth'
import { auth as authApp } from '../../../../firebase'
import Logo from '../../logo/Logo'
import { LoaderSvg, LogoutSvg, TijeraSvg } from '../../../../assets/svg'
import './Asidebar.css'

interface AsidebarProps {
  showMenu: boolean
}

const Asidebar = ({ showMenu }: AsidebarProps): JSX.Element => {
  // useSignOut
  const [signOut, loadingOut] = useSignOut(authApp)

  // useLocation
  const { pathname } = useLocation()

  // cerrar sesion
  const handleSignOut = (): void => {
    signOut().catch(error => {
      console.log(error)
    })
  }

  return (
    <header className={`Asidebar ${showMenu ? 'close' : ''}`}>
      <section className="Asidebar__top container">
        <Logo />

        <section className="Asidebar__center">
          <nav className="Asidebar__navegacion">
            <Link
              className={pathname === '/admin' ? 'active' : ''}
              to="/admin"
              title="DashBoard"
            >
              <TijeraSvg />
              <span>DashBoard</span>
            </Link>

            <Link
              className={pathname === '/admin/servicios' ? 'active' : ''}
              to="/admin/servicios"
              title="servicios"
            >
              <TijeraSvg />
              <span>servicios</span>
            </Link>

            <Link
              className={pathname === '/admin/users' ? 'active' : ''}
              to="/admin/users"
              title="users"
            >
              <TijeraSvg />
              <span>users</span>
            </Link>

            <Link
              className={pathname === '/admin/citas' ? 'active' : ''}
              to="/admin/citas"
              title="citas"
            >
              <TijeraSvg />
              <span>citas</span>
            </Link>

            <Link
              className={pathname === '/admin/barberos' ? 'active' : ''}
              to="/admin/barberos"
              title="barberos"
            >
              <TijeraSvg />
              <span>barberos</span>
            </Link>

            <Link
              className={pathname === '/admin/reportes' ? 'active' : ''}
              to="/admin/reportes"
              title="reportes"
            >
              <TijeraSvg />
              <span>reportes</span>
            </Link>

            <Link
              className={pathname === '/admin/horarios' ? 'active' : ''}
              to="/admin/horarios"
              title="horarios"
            >
              <TijeraSvg />
              <span>horarios</span>
            </Link>

            <Link
              className={pathname === '/admin/configuracion' ? 'active' : ''}
              to="/admin/configuracion"
              title="configuracion"
            >
              <TijeraSvg />
              <span>configuracion</span>
            </Link>
          </nav>

          <button className="btn-primary" onClick={handleSignOut}>
            {loadingOut ? (
              <LoaderSvg />
            ) : (
              <>
                <LogoutSvg />
                <span>Cerrar Sesion</span>
              </>
            )}
          </button>
        </section>
      </section>
    </header>
  )
}

export default Asidebar
