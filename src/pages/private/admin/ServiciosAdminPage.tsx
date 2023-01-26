import { useState } from 'react'
import useMain from '../../../hooks/useMain'
import ModalServicio from '../../../components/containers/admin/modales/ModalServicio'
import Servicio from '../../../components/containers/admin/servicios/Servicio'
import { LoaderSvg, PlusSvg, SearchSvg } from '../../../assets/svg'
import { estados } from '../../../constants'
import '../../../styles/ServiciosAdminPage.css'

const ServiciosAdminPage = (): JSX.Element => {
  // Estados
  const [openModal, setOpenModal] = useState<boolean>(false)

  // useMain
  const { servicioEdit, servicios, loadingServicio } = useMain()

  return (
    <>
      <section className="ServiciosAdminPage">
        <div className="ServiciosAdminPage__top">
          <form>
            <input type="search" placeholder="Buscar" />
            <button type="submit" title="Buscar" className="title">
              {<SearchSvg />}
            </button>
          </form>
          <div className="ServiciosAdminPage__topRight">
            <select name="filtar" id="filtar">
              {Object.entries(estados).map(([key, value]) => (
                <option /* selected={key === 'pendiente'} */ key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <button title="Crear" className="btn-primary" onClick={() => setOpenModal(!openModal)}>
              <PlusSvg />
              Crear
            </button>
          </div>
        </div>
        {loadingServicio && <LoaderSvg />}

        <div className="ServiciosAdminPage__center">
          <table>
            <thead className="ServiciosAdminPage__centerTop">
              <tr>
                <th>Foto</th>
                <th>Servicio</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Barberos</th>
                <th>Duracion</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.length > 0 ? (
                servicios.map(servicio => <Servicio key={servicio.id} servicio={servicio} />)
              ) : (
                <tr>
                  <td colSpan={7}>
                    <p className="vacio">No hay servicios</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {(openModal || servicioEdit) && <ModalServicio setOpenModal={setOpenModal} />}
    </>
  )
}

export default ServiciosAdminPage
