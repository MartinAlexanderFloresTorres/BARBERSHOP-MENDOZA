/**
 * Format money to string
 * @param {amount} number
 * @returns {string} string
 */
export const formatMoney = (amount: number): string => {
  return amount.toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
  })
}

/**
 * Funcion para generar un id unico
 * @returns {string} id
 */

export const generarId = (): string => {
  const fecha = Date.now().toString(36).substr(2)
  const ramdom = Math.random().toString(36).substr(2)
  return fecha + ramdom
}

/**
 * Funcion para formatear fecha
 * @param {fecha} string
 * @returns {string} string
 *
 */
export const formatearFecha = (fecha: string): string => {
  let nuevaFecha
  if (fecha.includes('T00:00:00.000Z')) {
    const _ = fecha.split('T')[0].split('-').toString()
    nuevaFecha = new Date(_)
  } else {
    nuevaFecha = new Date(fecha)
  }
  return nuevaFecha.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Funcion para formatear los minutos en hora, minutos
 * @params {minutos} number
 * @returns {string} string
 * @example 120 minutos = 2 horas 0 minutos
 * @example 90 minutos = 1 horas 30 minutos
 * @example 60 minutos = 1 horas 0 minutos
 * @example 30 minutos = 0 horas 30 minutos
 */

export const formatearMinutos = (minutos: number): string => {
  const horas = Math.floor(minutos / 60)
  const minutosRestantes = minutos % 60
  return `${horas} horas ${minutosRestantes} minutos`
}

export const validarHorarioAndFecha = (_fecha: string, _hora: string): string => {
  // Validar fecha
  const year = Number(_fecha.split('-')[0])
  const mes = Number(_fecha.split('-')[1])
  const dia = Number(_fecha.split('-')[2])
  const hora = Number(_hora.split(':')[0])
  const minutos = Number(_hora.split(':')[1])

  const hoy = new Date(new Date().setUTCHours(0, 0, 0, 0))

  // El año no puede ser menor al actual
  if (year < hoy.getFullYear()) {
    return 'El año no puede ser menor al actual'
  }

  if (mes < hoy.getMonth() + 1) {
    return 'El mes no puede ser menor al mes actual'
  }

  if (dia < hoy.getDate()) {
    return 'La dia no puede ser menor al dia actual'
  }

  // no puede ser domingo
  if (new Date(year, mes - 1, dia).getDay() === 0) {
    return 'El dia no puede ser domingo'
  }

  if (hora < 11 || (hora === 11 && minutos < 30)) {
    return 'La hora no puede ser menor a 11:30 AM'
  }

  if (hora > 19 || (hora === 19 && minutos > 30)) {
    return 'La hora no puede ser mayor a 7:30 PM'
  }

  return ''
}
