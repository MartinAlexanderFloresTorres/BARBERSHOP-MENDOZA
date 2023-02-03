import Swal from 'sweetalert2'
import useMain from '../../../../hooks/useMain'
import deleteImage from '../../../../firebase/deleteImage'
import { formatMoney, formatearMinutos } from '../../../../helpers'
import { ServicioType } from '../../../../types'
import { PencilSvg, TrashSvg } from '../../../../assets/svg'

interface ServicioProps {
  servicio: ServicioType
}

const Servicio = ({ servicio }: ServicioProps): JSX.Element => {
  const { id, servicio: service, descripcion, imagen, precio, barberos, duracion, stock } = servicio

  // useMain
  const { deleteServicio, addServicioEdit } = useMain()

  // handle Delete Servicio
  const handleDeleteServicio = (): void => {
    void Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: 'Si, eliminar',
    }).then(result => {
      if (result.isDenied) {
        void (async () => {
          try {
            await deleteServicio(id)
            await deleteImage(imagen)
            void Swal.fire({
              icon: 'success',
              title: 'Servicio eliminado',
              text: 'El servicio se eliminó correctamente',
            })
          } catch (error) {
            console.log(error)
            void Swal.fire({
              icon: 'error',
              title: 'Ocurrio un error al eliminar el servicio',
              text: 'Algo salió mal',
            })
          }
        })()
      }
    })
  }
  return (
    <tr key={id} className="ServiciosAdminPage__centerBottom">
      <td>
        <p>
          <a href={imagen} target="_blank" rel="noreferrer">
            <img src={imagen} alt="Servicio" />
          </a>
        </p>
      </td>
      <td>
        <p title={service}>{service}</p>
      </td>
      <td>
        <p title={descripcion}>{descripcion}</p>
      </td>
      <td>
        <p className="precio" title={formatMoney(precio)}>
          {formatMoney(precio)}
        </p>
      </td>
      <td>
        <p className="ServiciosAdminPage__barberos">{barberos.length > 0 && barberos.map(barbero => <span key={barbero.id}>{barbero.nombre}</span>)}</p>
      </td>
      <td>
        <p title={formatearMinutos(duracion)}>{formatearMinutos(duracion)}</p>
      </td>
      <td>
        <p>{stock}</p>
      </td>
      <td>
        <div className="ServiciosAdminPage__acciones">
          <button title="Editar" className="btn-danger" onClick={handleDeleteServicio}>
            <TrashSvg />
          </button>
          <button title="Eliminar" className="btn-primary" onClick={() => addServicioEdit(servicio)}>
            <PencilSvg />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default Servicio
