import { useEffect, useState } from 'react'
import useMain from '../../../hooks/useMain'
import ModalServicio from '../../../components/containers/admin/modales/ModalServicio'
import Servicio from '../../../components/containers/admin/servicios/Servicio'
import { PlusSvg, SearchSvg } from '../../../assets/svg'
import '../../../styles/ServiciosAdminPage.css'
import { ServicioType } from '../../../types'

const ServiciosAdminPage = (): JSX.Element => {
  // Estados
  const [busqueda, setBusqueda] = useState('')
  const [resultados, setResultados] = useState<ServicioType[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)

  // useMain
  const { servicioEdit, servicios } = useMain()

  // Effecto de resultados de busqueda
  useEffect(() => {
    const busquedaMinus = busqueda.toLowerCase().trim()
    const filtro = (servicio: ServicioType): boolean => servicio.servicio.toLowerCase().trim().includes(busquedaMinus)

    if (busqueda.length > 0) {
      const resultados = servicios.filter(filtro)
      setResultados(resultados)
    } else {
      setResultados(servicios)
    }
  }, [busqueda, servicios])

  // Handle Busqueda
  const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBusqueda(e.target.value)
  }

  // handle Search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const busquedaMinus = busqueda.toLowerCase().trim()
    const resultados = servicios.filter(servicio => servicio.servicio.toLowerCase().trim().includes(busquedaMinus))
    setResultados(resultados)
  }

  // Reset Resultados
  const resetResultados = (): void => {
    setResultados(servicios)
    setBusqueda('')
  }
  return (
    <>
      <section className="ServiciosAdminPage">
        <div className="ServiciosAdminPage__top">
          <form onSubmit={handleSearch}>
            <input type="search" placeholder="Buscar" value={busqueda} onChange={handleBusqueda} />
            <button type="submit" title="Buscar" className="title">
              {<SearchSvg />}
            </button>
          </form>
          <div className="ServiciosAdminPage__topRight">
            <button title="Crear" className="btn-primary" onClick={() => setOpenModal(!openModal)}>
              <PlusSvg />
              Crear
            </button>
          </div>
        </div>

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
              {resultados.length > 0 ? (
                resultados.map(servicio => <Servicio key={servicio.id} servicio={servicio} />)
              ) : (
                <tr>
                  <td colSpan={8}>
                    <p className="vacio">No hay servicios</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {resultados.length === 0 && (
            <button className="mx-auto my-10 btn btn-primary" onClick={resetResultados}>
              restablecer
            </button>
          )}
        </div>
      </section>

      {(openModal || servicioEdit) && <ModalServicio setOpenModal={setOpenModal} />}
    </>
  )
}

export default ServiciosAdminPage
