import Swal from 'sweetalert2'
import useMain from '../../../../hooks/useMain'
import { formatMoney, formatearFecha, formatearMinutos } from '../../../../helpers'
import { EstadoType, ServicioCitaType } from '../../../../types'
import { PencilSvg, TrashSvg } from '../../../../assets/svg'
import { colores, estados } from '../../../../constants'
import { useEffect, useState } from 'react'

interface CitaProps {
  cita: ServicioCitaType
}

const Cita = ({ cita }: CitaProps): JSX.Element => {
  // Estados
  const [selectEstado, setSelectEstado] = useState<EstadoType>('pendiente')

  const { id, nombre, email, estado, fecha, hora, pagado, servicios, user } = cita

  // useMain
  const { DeleteCita, addCitaEdit, updateEstado } = useMain()

  // Effecto de default select estado
  useEffect(() => {
    setSelectEstado(estado)
  }, [cita])

  // handle Delete Servicio
  const handleDeleteCita = (): void => {
    void Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: 'Si, eliminar',
    }).then(result => {
      if (result.isDenied) {
        if (!id) return

        void (async () => {
          try {
            await DeleteCita(id)
            void Swal.fire({
              icon: 'success',
              title: 'Cita eliminado',
              text: 'La cita se eliminó correctamente',
            })
          } catch (error) {
            console.log(error)
            void Swal.fire({
              icon: 'error',
              title: 'Ocurrio un error al eliminar la cita',
              text: 'Algo salió mal',
            })
          }
        })()
      }
    })
  }

  // Handle Estado
  const handleEstado = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const estado = e.target.value as EstadoType
    if (id) {
      setSelectEstado(estado)
      void updateEstado(id, estado)
    }
  }

  return (
    <tr className="CitasPage__centerBottom">
      <td>
        <p>{nombre}</p>
      </td>
      <td>
        <div className="CitasPage__centerBottomServicios">
          {servicios.map(servicio => (
            <div key={servicio.id}>
              <img src={servicio.imagen} alt={servicio.servicio} />
              <h2>{servicio.servicio}</h2>
              <span>{formatearMinutos(servicio.duracion)}</span>
              <span className="precio">{formatMoney(servicio.precio)}</span>
            </div>
          ))}
        </div>
      </td>
      <td>
        <p>{1}</p>
      </td>
      <td>
        <p className="break-all" title={formatearFecha(fecha)}>
          {formatearFecha(fecha)}
        </p>
      </td>
      <td>
        <p className="break-all" title={hora}>
          {hora}
        </p>
      </td>
      <td>
        <select
          style={{
            background: colores[estado].background,
            color: colores[estado].color,
          }}
          className="estado"
          value={selectEstado}
          onChange={handleEstado}
        >
          {Object.entries(estados).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </td>

      <td>
        <div className="CitasPage__acciones">
          <button title="Editar" className="btn-danger" onClick={handleDeleteCita}>
            <TrashSvg />
          </button>
          <button title="Eliminar" className="btn-primary" onClick={() => addCitaEdit(cita)}>
            <PencilSvg />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default Cita
