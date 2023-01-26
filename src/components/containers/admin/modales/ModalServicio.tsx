import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import useMain from '../../../../hooks/useMain'
import uploadImage from '../../../../firebase/uploadImage'
import deleteImage from '../../../../firebase/deleteImage'
import { CloseSvg, LoaderSvg } from '../../../../assets/svg'
import './Modal.css'

interface ModalServicioProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const DEFAULT_STATE = {
  campos: {
    imagen: {
      url: '',
      file: null,
    },
    servicio: '',
    descripcion: '',
    precio: '',
    barberos: [],
    duracion: '',
    stock: '',
  },
}

interface ModalServicioState {
  campos: {
    imagen: {
      url: string
      file: null | File
    }
    servicio: string
    descripcion: string
    precio: number | string
    barberos: string[]
    duracion: number | string
    stock: number | string
  }
}

const ModalServicio = ({ setOpenModal }: ModalServicioProps): JSX.Element => {
  // Estados
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
  const [campos, setCampos] = useState<ModalServicioState['campos']>(DEFAULT_STATE.campos)
  const [checkedImage, setCheckedImage] = useState<boolean>(false)

  const [barberos, setBarberos] = useState<string[]>(['barbero 1', 'barbero 2', 'barbero 3'])

  // useMain
  const { addServicio, servicioEdit, addServicioEdit, EditServicio } = useMain()

  // useEffect
  useEffect(() => {
    if (servicioEdit) {
      setCampos({
        imagen: { file: null, url: servicioEdit.imagen },
        servicio: servicioEdit.servicio,
        descripcion: servicioEdit.descripcion,
        precio: servicioEdit.precio,
        duracion: servicioEdit.duracion,
        stock: servicioEdit.stock,
        barberos: servicioEdit.barberos,
      })
    }
  }, [servicioEdit])

  useEffect(() => {
    if (servicioEdit) {
      if (checkedImage) {
        if (!campos.imagen.file) {
          setCampos(prev => ({ ...prev, imagen: { url: '', file: null } }))
        }
      } else {
        setCampos(prev => ({
          ...prev,
          imagen: { file: null, url: servicioEdit.imagen },
        }))
      }
    }
  }, [checkedImage])

  useEffect(() => {
    if (campos.imagen.file) {
      setCheckedImage(true)
    }
  }, [campos])

  // handle Change Inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target

    setCampos({ ...campos, [name]: value })
  }

  // handle Image
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setCampos(prev => ({ ...prev, imagen: { url, file } }))
    }
  }

  // add Barbero
  const addBarbero = (barber: string): void => {
    // Si el barbero ya esta en el array, no lo agregamos
    if (campos.barberos.includes(barber)) return

    setCampos(prev => ({ ...prev, barberos: [...prev.barberos, barber] }))
  }

  // remove Barbero
  const removeBarbero = (barber: string): void => {
    const newBarberos = campos.barberos.filter(barberoSelect => barberoSelect !== barber)
    setCampos(prev => ({
      ...prev,
      barberos: newBarberos,
    }))
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

    // Validar barberos
    if (campos.barberos.length === 0) {
      void Swal.fire({
        icon: 'warning',
        title: 'Debes seleccionar al menos un barbero',
      })
      return
    }

    // Validar imagen
    if (!campos.imagen.file && checkedImage) {
      void Swal.fire({
        icon: 'warning',
        title: 'Debes seleccionar una imagen',
      })
      return
    }

    try {
      setLoadingSubmit(true)
      const url = campos.imagen.file ? await uploadImage(campos.imagen.file) : campos.imagen.url
      const data = {
        ...campos,
        imagen: url,
        precio: Number(campos.precio),
        duracion: Number(campos.duracion),
        stock: Number(campos.stock),
      }

      // Enviar formulario
      if (servicioEdit) {
        if (checkedImage || campos.imagen.file) {
          await deleteImage(servicioEdit.imagen)
        }
        await EditServicio({
          ...data,
          id: servicioEdit.id,
        })
      } else {
        await addServicio(data)
      }

      // Mostrar Alerta
      void Swal.fire({
        icon: 'success',
        title: 'Servicio agregado correctamente',
      })

      // Limpiar formulario
      setCampos(DEFAULT_STATE.campos)
      // Cerrar el modal
      handleCloseModal()
    } catch (error) {
      console.log(error)
      void Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error al agregar el servicio',
      })
    }
    setLoadingSubmit(false)
  }

  // Cerrar moda
  const handleCloseModal = (): void => {
    setOpenModal(false)
    servicioEdit && addServicioEdit(null as never)
  }
  return (
    <section className={'Modal'}>
      <section className={`Modal__contenedor ${loadingSubmit ? 'loader' : ''}`}>
        <div className="Modal__top">
          <h2>{servicioEdit ? 'Editar Servicio' : 'Agregar Servicio'}</h2>
          <button type="button" className="Modal__topClose" onClick={handleCloseModal}>
            <CloseSvg />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {servicioEdit && (
            <label className="Modal__editarBtn btn btn-black" htmlFor="checkboxImage">
              {checkedImage ? 'No editar imagen' : 'Editar imagen'}
              <input id="checkboxImage" name="checkboxImage" type="checkbox" checked={checkedImage} onChange={() => setCheckedImage(!checkedImage)} />
            </label>
          )}
          <label htmlFor="imagen">
            <span>Imagen</span>
            <img
              src={campos.imagen.url}
              onError={e => {
                const target = e.target as HTMLImageElement
                target.src = '/foto_default.png'
              }}
              alt="Servicio"
            />
            <input accept="image/*" type="file" name="imagen" id="imagen" onChange={handleImage} style={{ display: 'none' }} />
          </label>

          <label htmlFor="servicio">
            <span>Servicio</span>
            <input type="text" name="servicio" id="servicio" placeholder="Servicio" value={campos.servicio} onChange={handleChange} />
          </label>

          <label htmlFor="descripcion">
            <span>Descripción</span>
            <textarea name="descripcion" id="descripcion" placeholder="descripcion" value={campos.descripcion} onChange={handleChange} />
          </label>

          <label htmlFor="precio">
            <span>Precio (soles)</span>
            <input type="number" min={0} max={1000} name="precio" id="precio" placeholder="Precio" value={campos.precio} onChange={handleChange} />
          </label>

          <label htmlFor="duracion">
            <span>Duración (minutos)</span>
            <input type="number" min={0} max={2000} name="duracion" id="duracion" placeholder="120" value={campos.duracion} onChange={handleChange} />
          </label>

          <label htmlFor="stock">
            <span>Stock</span>
            <input type="number" min={0} name="stock" id="stock" placeholder="stock" value={campos.stock} onChange={handleChange} />
          </label>

          <label htmlFor="barbero">
            <span>Barberos</span>
            <div className="Modal__barberosSelect">
              {campos.barberos.length > 0 ? (
                campos.barberos.map(barber => (
                  <div key={barber} className="btn-primary">
                    {barber}
                    <button type="button" onClick={() => removeBarbero(barber)}>
                      <CloseSvg />
                    </button>
                  </div>
                ))
              ) : (
                <span>No hay barberos seleccionados</span>
              )}
            </div>
            <div className="Modal__barberosOffSelect">
              {barberos.map(barber => (
                <button className="btn" type="button" key={barber} onClick={() => addBarbero(barber)} disabled={campos.barberos.includes(barber)}>
                  {barber}
                </button>
              ))}
            </div>
          </label>

          <div className="Modal__botones">
            <button onClick={handleCloseModal} type="button" className="btn-black">
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {servicioEdit ? 'Editar' : 'Agregar'}
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

export default ModalServicio
