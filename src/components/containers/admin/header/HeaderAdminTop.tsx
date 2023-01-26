import { Link } from 'react-router-dom'
import { EyeSlashSvg, EyeSvg, UserSvg } from '../../../../assets/svg'
import useMain from '../../../../hooks/useMain'
import './headerAdminTop.css'

interface HeaderAdminTopProps {
  handleShowMenu: () => void
  showMenu: boolean
}

const HeaderAdminTop = ({
  handleShowMenu,
  showMenu,
}: HeaderAdminTopProps): JSX.Element => {
  // useMain
  const { user } = useMain()

  return (
    <header className="HeaderAdminTop">
      <section className="HeaderAdminTop__top">
        <button
          className="HeaderAdminTop__menu"
          onClick={handleShowMenu}
          title="Menu"
        >
          {showMenu ? <EyeSvg /> : <EyeSlashSvg />}
        </button>

        <section className="HeaderAdminTop__right">
          <Link to="/auth/profile" title="Perfil">
            {user?.photoURL ? (
              <img
                className="HeaderAdminTop__photoURL"
                src={user?.photoURL}
                onError={e => {
                  const img = e.target as HTMLImageElement
                  img.src = 'https://picsum.photos/200/300'
                  console.warn('No se pudo cargar la imagen')
                }}
                alt={user?.displayName ?? 'usuario'}
              />
            ) : (
              <UserSvg />
            )}
            <span className="HeaderAdminTop__displayName">
              {user?.displayName}
            </span>
          </Link>
        </section>
      </section>
    </header>
  )
}

export default HeaderAdminTop
