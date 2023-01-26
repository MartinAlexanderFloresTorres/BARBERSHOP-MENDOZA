import React, { useEffect, useState } from 'react'
import useMain from '../../../hooks/useMain'
import { DEFAULT_STATE_CITA, InterfaceCitaProps } from '../../../contexts/MainContext'
import { validarHorarioAndFecha } from '../../../helpers'

const InformacionCitaItem = (): JSX.Element => {
  // Estados
  const [campos, setCampos] = useState<InterfaceCitaProps>(DEFAULT_STATE_CITA)
  const [alerta, setAlerta] = useState<string>('')

  // useMain
  const { user, changeItem, handleCita } = useMain()

  // Efecto de usuario
  useEffect(() => {
    autoCampos()
  }, [])

  // Efecto de campos
  useEffect(() => {
    validarCampos()
  }, [campos, user])

  const autoCampos = (): void => {
    // guardar el nombre
    const nombre = user?.displayName ?? ''
    setCampos(prev => ({ ...prev, nombre }))

    // fecha actual
    const fecha = new Date()
      .toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .split('/')
      .reverse()
      .join('-')

    const dia = Number(fecha.split('-')[2])

    // no puede ser domingo
    if (dia !== 8) {
      setCampos(prev => ({ ...prev, fecha }))
    }

    // hora sin segundos
    const hora = new Date().toTimeString().split(' ')[0].split(':').slice(0, 2).join(':')

    const _hora = Number(hora.split(':')[0])

    if (_hora > 8 && _hora <= 19) {
      setCampos(prev => ({ ...prev, hora }))
    }
  }

  // Validar campos
  const validarCampos = (): void => {
    // Validar campos
    handleCita(() => DEFAULT_STATE_CITA)

    // Validar nombre
    if (campos.nombre.trim().length < 3) {
      setAlerta('El nombre debe tener al menos 3 caracteres')
      return
    }

    // Validar fecha y hora
    const validacion = validarHorarioAndFecha(campos.fecha, campos.hora)
    if (validacion !== '') {
      setAlerta(validacion)
      return
    }

    // Success
    setAlerta('')
    handleCita((prev: InterfaceCitaProps) => ({
      ...prev,
      ...campos,
      email: user?.email ?? '',
    }))
  }

  // change campos
  const changeCampos = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setCampos({ ...campos, [name]: value })
  }

  // Handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (alerta === '') {
      changeItem(3)
    }
  }
  return (
    <div>
      <div className="servicios__encabezado">
        <h2>Información de la cita</h2>
        <p>Ingrese la información de la cita</p>
      </div>

      <section className="layoutAuth__section">
        {alerta && <p className="alerta alerta-error">{alerta}</p>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="nombre">
              Nombre
            </label>
            <input type="text" value={campos.nombre} onChange={changeCampos} name="nombre" id="nombre" placeholder="nombre" />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="fecha">
              Fecha
            </label>
            <input
              type="date"
              value={campos.fecha}
              onChange={changeCampos}
              name="fecha"
              id="fecha"
              placeholder="fecha"
              min={new Date()
                .toLocaleString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
                .split('/')
                .reverse()
                .join('-')}
              max={
                new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()) // un año despues
                  .toISOString()
                  .split('T')[0]
              }
            />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="hora">
              Hora
            </label>
            <input type="time" value={campos.hora} onChange={changeCampos} name="hora" id="hora" placeholder="hora" min="11:30" max="19:30" />
          </div>
        </form>
      </section>
    </div>
  )
}

export default InformacionCitaItem
