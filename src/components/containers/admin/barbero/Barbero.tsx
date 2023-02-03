import Swal from 'sweetalert2'
import useMain from '../../../../hooks/useMain'
import deleteImage from '../../../../firebase/deleteImage'
import { BarberoType } from '../../../../types'
import { PencilSvg, TrashSvg } from '../../../../assets/svg'

interface BarberoProps {
  barbero: BarberoType
}

const Barbero = ({ barbero }: BarberoProps): JSX.Element => {
  const { id, imagen, especialidades, incognito, nombre, titulo } = barbero

  // useMain
  const { DeleteBarbero, addBarberoEdit } = useMain()

  // handle Delete Barbero
  const handleDeleteBarbero = (): void => {
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
            await DeleteBarbero(id)
            await deleteImage(imagen)
            void Swal.fire({
              icon: 'success',
              title: 'Barbero eliminado',
              text: 'El Barbero se eliminó correctamente',
            })
          } catch (error) {
            console.log(error)
            void Swal.fire({
              icon: 'error',
              title: 'Ocurrio un error al eliminar el Barbero',
              text: 'Algo salió mal',
            })
          }
        })()
      }
    })
  }
  return (
    <tr key={id} className="BarberosPage__centerBottom">
      <td>
        <p>
          <a href={imagen} target="_blank" rel="noreferrer">
            <img src={imagen} alt="Barbero" />
          </a>
        </p>
      </td>

      <td>
        <p title={titulo}>{titulo}</p>
      </td>

      <td>
        <p title={nombre}>{nombre}</p>
      </td>

      <td>
        <p title={especialidades}>{especialidades}</p>
      </td>

      <td>
        <p className={incognito ? 'gray' : 'green'} title={incognito ? 'si' : 'no'}>
          {incognito ? 'si' : 'no'}
        </p>
      </td>

      <td>
        <div className="BarberosPage__acciones">
          <button title="Editar" className="btn-danger" onClick={handleDeleteBarbero}>
            <TrashSvg />
          </button>
          <button title="Eliminar" className="btn-primary" onClick={() => addBarberoEdit(barbero)}>
            <PencilSvg />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default Barbero
