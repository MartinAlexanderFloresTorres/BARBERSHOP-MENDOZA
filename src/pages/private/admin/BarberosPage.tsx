import { useState } from 'react'
import useMain from '../../../hooks/useMain'
import { LoaderSvg, PlusSvg } from '../../../assets/svg'
import ModalBarbero from '../../../components/containers/admin/modales/ModalBarbero'
import Barbero from '../../../components/containers/admin/barbero/Barbero'
import '../../../styles/BarberosPage.css'

const BarberosPage = (): JSX.Element => {
  // Estados
  const [openModal, setOpenModal] = useState<boolean>(false)

  // useMain
  const { barberoEdit, barberos, loadingBarbero } = useMain()

  return (
    <>
      <section className="BarberosPage">
        {loadingBarbero && <LoaderSvg />}
        <div className="BarberosPage__top">
          <div className="BarberosPage__topRight">
            <button title="Crear" className="btn-primary" onClick={() => setOpenModal(!openModal)}>
              <PlusSvg />
              Crear
            </button>
          </div>
        </div>
        <div className="BarberosPage__center">
          <table>
            <thead className="BarberosPage__centerTop">
              <tr>
                <th>Foto</th>
                <th>Titulo</th>
                <th>Nombre</th>
                <th>Especialidades</th>
                <th>Incognito</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {barberos.length > 0 ? (
                barberos.map(barbero => <Barbero key={barbero.id} barbero={barbero} />)
              ) : (
                <tr>
                  <td colSpan={6}>
                    <p className="vacio">No hay barberos</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {(openModal || barberoEdit) && <ModalBarbero setOpenModal={setOpenModal} />}
    </>
  )
}

export default BarberosPage
