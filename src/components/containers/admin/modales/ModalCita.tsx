import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import useMain from '../../../../hooks/useMain'
import { CloseSvg, LoaderSvg } from '../../../../assets/svg'
import { colores, estados } from '../../../../constants'
import { EstadoType } from '../../../../types'
import './Modal.css'
import { validarHorarioAndFecha } from '../../../../helpers'

const DEFAULT_STATE = {
  campos: {
    nombre: '',
    fecha: '',
    hora: '',
  },
}

export interface camposCita {
  id: string
  nombre: string
  fecha: string
  hora: string
}

interface ModalCitaState {
  campos: {
    nombre: string
    fecha: string
    hora: string
  }
}

const ModalCita = (): JSX.Element => {
  // Estados
  const [alerta, setAlerta] = useState<string>('')
  const [selectEstado, setSelectEstado] = useState<EstadoType>('pendiente')
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
  const [campos, setCampos] = useState<ModalCitaState['campos']>(DEFAULT_STATE.campos)

  // useMain
  const { EditCita, citaEdit, addCitaEdit, updateEstado } = useMain()

  // Effecto de default select estado
  useEffect(() => {
    if (citaEdit) {
      setSelectEstado(citaEdit.estado)
    }
  }, [])

  // useEffect de auto relleno
  useEffect(() => {
    if (citaEdit) {
      setCampos({
        nombre: citaEdit.nombre,
        fecha: citaEdit.fecha,
        hora: citaEdit.hora,
      })
    }
  }, [citaEdit])

  // useEffect alerta
  useEffect(() => {
    // Validar fecha y hora
    const validacion = validarHorarioAndFecha(campos.fecha, campos.hora)
    if (validacion !== '') {
      setAlerta(validacion)
    } else if (campos.nombre.trim() === '') {
      setAlerta('El nombre es obligatorio')
    } else if (campos.nombre.trim().length < 3) {
      setAlerta('El nombre debe ser mayor a 3 caracteres')
    } else {
      setAlerta('')
    }
  }, [campos])

  // handle Change Inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setCampos({ ...campos, [name]: value })
  }

  // handle Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    // Verificar si se esta enviando el formulario
    if (loadingSubmit) return

    // Validar campos
    if (Object.values(campos).includes('')) {
      void Swal.fire({
        icon: 'warning',
        title: 'Todos los campos son obligatorios',
      })
      return
    }

    // Validar fecha y hora
    const validacion = validarHorarioAndFecha(campos.fecha, campos.hora)
    if (validacion !== '') {
      setAlerta(validacion)
      return
    }

    try {
      setLoadingSubmit(true)

      // Mostrar Alerta
      void Swal.fire({
        icon: 'success',
        title: 'Cita actualizada correctamente',
      })

      if (citaEdit?.id) {
        // Editar la cita
        void EditCita({
          id: citaEdit.id,
          ...campos,
        })
      }

      // Limpiar formulario
      setCampos(DEFAULT_STATE.campos)
      // Cerrar el modal
      handleCloseModal()
    } catch (error) {
      console.log(error)
      void Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error al actualizar la Cita',
      })
    }
    setLoadingSubmit(false)
  }

  // Cerrar moda
  const handleCloseModal = (): void => {
    citaEdit && addCitaEdit(null as never)
  }

  // Handle Estado
  const handleEstado = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const estado = e.target.value as EstadoType
    if (citaEdit?.id) {
      setSelectEstado(estado)
      void updateEstado(citaEdit.id, estado)
    }
  }

  return (
    <section className={'Modal'}>
      <section className={`Modal__contenedor ${loadingSubmit ? 'loader' : ''}`}>
        <div className="Modal__top">
          <h2>Editar Cita</h2>
          <button type="button" className="Modal__topClose" onClick={handleCloseModal}>
            <CloseSvg />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {alerta && <p className="alerta alerta-error">{alerta}</p>}
          <label htmlFor="nombre">
            <span>Nombre</span>
            <input type="text" name="nombre" id="nombre" placeholder="nombre" value={campos.nombre} onChange={handleChange} />
          </label>

          <label htmlFor="fecha">
            <span>Fecha</span>
            <input type="date" name="fecha" id="fecha" placeholder="fecha" value={campos.fecha} onChange={handleChange} />
          </label>

          <label htmlFor="hora">
            <span>Hora</span>
            <input type="time" min={0} max={1000} name="hora" id="hora" placeholder="hora" value={campos.hora} onChange={handleChange} />
          </label>

          <label htmlFor="estado">
            <span>Estado</span>
            <select
              style={{
                background: citaEdit ? colores[selectEstado].background : colores.warning.background,
                color: citaEdit ? colores[selectEstado].color : colores.warning.color,
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
          </label>

          <div className="Modal__botones">
            <button onClick={handleCloseModal} type="button" className="btn-black">
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Actualizar Cita
            </button>
          </div>
        </form>
      </section>

      {loadingSubmit && (
        <section className="Modal__loader">
          <LoaderSvg />
        </section>
      )}
    </section>
  )
}

export default ModalCita
