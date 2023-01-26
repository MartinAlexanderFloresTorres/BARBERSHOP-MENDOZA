interface EstadoType {
  pendiente: 'pendiente'
  cancelado: 'cancelado'
  atendido: 'atendido'
  reprogramado: 'reprogramado'
  warning: 'warning'
}

export const estados: EstadoType = {
  pendiente: 'pendiente',
  cancelado: 'cancelado',
  atendido: 'atendido',
  reprogramado: 'reprogramado',
  warning: 'warning',
}

export const colores = {
  atendido: {
    background: 'rgba(110, 255, 110, 0.292)',
    color: 'rgb(83, 255, 83)',
  },
  pendiente: {
    background: 'rgba(110, 110, 255, 0.292)',
    color: 'rgb(83, 83, 255)',
  },
  cancelado: {
    background: 'rgba(255, 110, 110, 0.292)',
    color: 'rgb(255, 83, 83)',
  },
  warning: {
    background: 'rgba(255, 255, 110, 0.292)',
    color: 'rgb(255, 255, 83)',
  },
  reprogramado: {
    background: 'rgba(110, 233, 255, 0.292)',
    color: 'rgb(255, 255, 255)',
  },
}
