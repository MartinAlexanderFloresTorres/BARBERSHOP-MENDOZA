import { Link, useLocation } from 'react-router-dom'
import { useSignOut } from 'react-firebase-hooks/auth'
import { auth as authApp } from '../../../../firebase'
import { CalendarSvg, ChartBarSvg, CitasSvg, FriendsSvg, HomeSvg, LoaderSvg, LogoutSvg, TijeraSvg, UsersSvg } from '../../../../assets/svg'
import Logo from '../../logo/Logo'
import './Asidebar.css'
import { useEffect } from 'react'

interface AsidebarProps {
  handleShowMenu: () => void
  showMenu: boolean
}

const Asidebar = ({ showMenu, handleShowMenu }: AsidebarProps): JSX.Element => {
  // useSignOut
  const [signOut, loadingOut] = useSignOut(authApp)

  // useLocation
  const { pathname } = useLocation()

  // useEffect
  useEffect(() => {
    document.addEventListener('keydown', handleEscape)
  }, [])

  // cerrar sesion
  const handleSignOut = (): void => {
    signOut().catch(error => {
      console.log(error)
    })
  }

  // Escape
  const handleEscape = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      handleShowMenu()
    }
  }

  return (
    <aside className={`Asidebar ${showMenu ? 'close' : ''}`}>
      <section className="Asidebar__top container">
        <Logo />

        <section className="Asidebar__center">
          <nav className="Asidebar__navegacion">
            <Link className={pathname === '/admin' ? 'active' : ''} to="/admin" title="DashBoard" onClick={handleShowMenu}>
              <HomeSvg />
              <span>DashBoard</span>
            </Link>

            <Link className={pathname === '/admin/servicios' ? 'active' : ''} to="/admin/servicios" title="servicios" onClick={handleShowMenu}>
              <TijeraSvg />
              <span>servicios</span>
            </Link>

            <Link className={pathname === '/admin/users' ? 'active' : ''} to="/admin/users" title="users" onClick={handleShowMenu}>
              <UsersSvg />
              <span>users</span>
            </Link>

            <Link className={pathname === '/admin/citas' ? 'active' : ''} to="/admin/citas" title="citas" onClick={handleShowMenu}>
              <CitasSvg />
              <span>citas</span>
            </Link>

            <Link className={pathname === '/admin/barberos' ? 'active' : ''} to="/admin/barberos" title="barberos" onClick={handleShowMenu}>
              <FriendsSvg />
              <span>barberos</span>
            </Link>

            <Link className={pathname === '/admin/reportes' ? 'active' : ''} to="/admin/reportes" title="reportes" onClick={handleShowMenu}>
              <ChartBarSvg />
              <span>reportes</span>
            </Link>

            <Link className={pathname === '/admin/horarios' ? 'active' : ''} to="/admin/horarios" title="horarios" onClick={handleShowMenu}>
              <CalendarSvg />
              <span>horarios</span>
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
    </aside>
  )
}

export default Asidebar
