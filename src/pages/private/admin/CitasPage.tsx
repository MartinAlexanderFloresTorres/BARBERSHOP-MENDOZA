import { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { LoaderSvg, SearchSvg } from '../../../assets/svg'
import { ServicioCitaType } from '../../../types'
import { estados } from '../../../constants'
import Cita from '../../../components/containers/admin/citas/Cita'
import useMain from '../../../hooks/useMain'
import ModalCita from '../../../components/containers/admin/modales/ModalCita'
import '../../../styles/CitasPage.css'

const CitasPage = (): JSX.Element => {
  // Estados
  const [loadingCitas, setLoadingCitas] = useState<boolean>(true)
  const [citas, setCitas] = useState<ServicioCitaType[]>([])

  // useMain
  const { citaEdit } = useMain()

  // UseEffect
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'citas'), snapshot => {
      const serviciosFirebase = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as []

      setLoadingCitas(false)
      setCitas(serviciosFirebase)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <>
      <section className="CitasPage">
        <div className="CitasPage__top">
          <form>
            <input type="search" placeholder="Buscar" />
            <button type="submit" title="Buscar" className="title">
              {<SearchSvg />}
            </button>
          </form>
          <div className="CitasPage__topRight">
            <select name="filtar" id="filtar">
              {Object.entries(estados).map(([key, value]) => (
                <option /* selected={key === 'pendiente'} */ key={key} value={key}>
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
                <th>Servicios</th>
                <th>Order</th>
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
                    <div className="CitasPage__centerLoader">
                      <LoaderSvg />
                    </div>
                  </td>
                </tr>
              ) : citas.length > 0 ? (
                citas.map((cita, index) => <Cita key={index} cita={cita} />)
              ) : (
                <tr>
                  <td colSpan={7}>
                    <p className="vacio">No hay citas aun </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {citaEdit && <ModalCita />}
    </>
  )
}

export default CitasPage
