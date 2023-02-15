import { useEffect, useState } from 'react'
import { LoaderSvg, SearchSvg } from '../../../assets/svg'
import { EstadoType, ServicioCitaType } from '../../../types'
import { estados } from '../../../constants'
import Cita from '../../../components/containers/admin/citas/Cita'
import useMain from '../../../hooks/useMain'
import ModalCita from '../../../components/containers/admin/modales/ModalCita'
import useGetCitas from '../../../hooks/useGetCitas'
import '../../../styles/CitasPage.css'

const CitasPage = (): JSX.Element => {
  // UseGetCitas
  const { loadingCitas, citas } = useGetCitas()
  const [busqueda, setBusqueda] = useState('')
  const [resultados, setResultados] = useState<ServicioCitaType[]>([])
  const [estado, setEstado] = useState('' as EstadoType)

  // useMain
  const { citaEdit } = useMain()

  // Effecto de default select estado y resultados de busqueda
  useEffect(() => {
    const busquedaMinus = busqueda.toLowerCase().trim()
    const filtro = (cita: ServicioCitaType): boolean => cita.nombre.toLowerCase().trim().includes(busquedaMinus)

    if (estado.length > 0) {
      const resultados = citas.filter(filtro).filter(cita => cita.estado === estado)
      setResultados(resultados)
    } else if (busqueda.length > 0) {
      const resultados = citas.filter(filtro)
      setResultados(resultados)
    } else {
      setResultados(citas)
    }
  }, [estado, busqueda, citas])

  // Handle Busqueda
  const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBusqueda(e.target.value)
  }

  // Handle Filtro
  const handleEstado = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setEstado(e.target.value as EstadoType)
  }

  // handle Search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const busquedaMinus = busqueda.toLowerCase().trim()
    const resultados = citas.filter(cita => cita.nombre.toLowerCase().trim().includes(busquedaMinus)).filter(cita => cita.estado === estado)
    setResultados(resultados)
  }

  // Reset Resultados
  const resetResultados = (): void => {
    setResultados(citas)
    setBusqueda('')
    setEstado('' as EstadoType)
  }
  return (
    <>
      <section className="CitasPage">
        <div className="CitasPage__top">
          <form onSubmit={handleSearch}>
            <input type="search" placeholder="Buscar" value={busqueda} onChange={handleBusqueda} />
            <button type="submit" title="Buscar" className="title">
              {<SearchSvg />}
            </button>
          </form>
          <div className="CitasPage__topRight">
            <select name="filtar" id="filtar" value={estado} onChange={handleEstado}>
              <option value="">Todos</option>
              {Object.entries(estados).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="CitasPage__center">
          <table>
            <thead className="CitasPage__centerTop">
              <tr>
                <th>Nombre</th>
                <th>Citas</th>
                <th>Servicios</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loadingCitas ? (
                <tr>
                  <td colSpan={7}>
                    <div className="loader__center">
                      <LoaderSvg />
                    </div>
                  </td>
                </tr>
              ) : resultados.length > 0 ? (
                resultados.map((cita, index) => <Cita key={index} cita={cita} />)
              ) : (
                <tr>
                  <td colSpan={7}>
                    <p className="vacio">No hay citas</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {!loadingCitas && resultados.length === 0 && (
            <button className="mx-auto my-10 btn btn-primary" onClick={resetResultados}>
              restablecer
            </button>
          )}
        </div>
      </section>

      {citaEdit && <ModalCita />}
    </>
  )
}

export default CitasPage
