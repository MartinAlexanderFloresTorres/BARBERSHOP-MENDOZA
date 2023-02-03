import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import useMain from '../../../../hooks/useMain'
import uploadImage from '../../../../firebase/uploadImage'
import deleteImage from '../../../../firebase/deleteImage'
import { CloseSvg, LoaderSvg } from '../../../../assets/svg'
import './Modal.css'

interface ModalBarberoProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const DEFAULT_STATE = {
  campos: {
    imagen: {
      url: '',
      file: null,
    },
    titulo: '',
    nombre: '',
    especialidades: '',
    incognito: false,
  },
}

interface ModalBarberoState {
  campos: {
    imagen: {
      url: string
      file: null | File
    }
    titulo: string
    nombre: string
    especialidades: string
    incognito: boolean
  }
}

const ModalBarbero = ({ setOpenModal }: ModalBarberoProps): JSX.Element => {
  // Estados
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
  const [campos, setCampos] = useState<ModalBarberoState['campos']>(DEFAULT_STATE.campos)
  const [checkedImage, setCheckedImage] = useState<boolean>(false)

  // useMain
  const { addBarbero, barberoEdit, addBarberoEdit, EditBarbero } = useMain()

  // useEffect
  useEffect(() => {
    if (barberoEdit) {
      setCampos({
        imagen: { file: null, url: barberoEdit.imagen },
        titulo: barberoEdit.titulo,
        nombre: barberoEdit.nombre,
        especialidades: barberoEdit.especialidades,
        incognito: barberoEdit.incognito,
      })
    }
  }, [barberoEdit])

  useEffect(() => {
    if (barberoEdit) {
      if (checkedImage) {
        if (!campos.imagen.file) {
          setCampos(prev => ({ ...prev, imagen: { url: '', file: null } }))
        }
      } else {
        setCampos(prev => ({
          ...prev,
          imagen: { file: null, url: barberoEdit.imagen },
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

    if (name === 'incognito') {
      setCampos(prev => ({ ...prev, [name]: !prev.incognito }))
      return
    }

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

    // Validar imagen
    if (!campos.imagen.file && checkedImage) {
      void Swal.fire({
        icon: 'warning',
        title: 'Debes seleccionar una imagen',
      })
      return
    }

    if (!campos.imagen.url) {
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
      }

      // Enviar formulario
      if (barberoEdit) {
        if (checkedImage || campos.imagen.file) {
          await deleteImage(barberoEdit.imagen)
        }
        await EditBarbero({
          ...data,
          id: barberoEdit.id,
        })
      } else {
        await addBarbero(data as never)
      }

      // Mostrar Alerta
      void Swal.fire({
        icon: 'success',
        title: 'Barbero agregado correctamente',
      })

      // Limpiar formulario
      setCampos(DEFAULT_STATE.campos)
      // Cerrar el modal
      handleCloseModal()
    } catch (error) {
      console.log(error)
      void Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error al agregar el barbero',
      })
    }
    setLoadingSubmit(false)
  }

  // Cerrar moda
  const handleCloseModal = (): void => {
    setOpenModal(false)
    barberoEdit && addBarberoEdit(null as never)
  }
  return (
    <section className={'Modal'}>
      <section className={`Modal__contenedor ${loadingSubmit ? 'loader' : ''}`}>
        <div className="Modal__top">
          <h2>{barberoEdit ? 'Editar Barbero' : 'Agregar Barbero'}</h2>
          <button type="button" className="Modal__topClose" onClick={handleCloseModal}>
            <CloseSvg />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {barberoEdit && (
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
              alt="barbero"
            />
            <input accept="image/*" type="file" name="imagen" id="imagen" onChange={handleImage} style={{ display: 'none' }} />
          </label>

          <label htmlFor="titulo">
            <span>titulo</span>
            <input type="text" name="titulo" id="titulo" placeholder="titulo" value={campos.titulo} onChange={handleChange} />
          </label>

          <label htmlFor="nombre">
            <span>nombre</span>
            <input type="text" name="nombre" id="nombre" placeholder="nombre" value={campos.nombre} onChange={handleChange} />
          </label>

          <label htmlFor="especialidades">
            <span>especialidades</span>
            <input type="text" name="especialidades" id="especialidades" placeholder="especialidades" value={campos.especialidades} onChange={handleChange} />
          </label>

          <label className="Modal__editarBtn btn btn-black" htmlFor="incognito">
            incognito
            <input type="checkbox" name="incognito" id="incognito" placeholder="incognito" checked={campos.incognito} onChange={handleChange} />
          </label>

          <div className="Modal__botones">
            <button onClick={handleCloseModal} type="button" className="btn-black">
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {barberoEdit ? 'Editar' : 'Agregar'}
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

export default ModalBarbero
