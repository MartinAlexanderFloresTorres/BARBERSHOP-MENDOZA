import React from 'react'
import { BarberoType } from '../../../types'

interface BarberoProps {
  barbero: BarberoType
}

const Barbero = ({ barbero }: BarberoProps): JSX.Element => {
  const { nombre, titulo, incognito, especialidades, imagen } = barbero

  if (incognito) {
    return (
      <div className="barberos__item" title="Pronto">
        <div className="barberos__imagen misterioso">
          <img src="/barberos/misterio.webp" alt="Barbero misterioso" />
        </div>
        <div className="barberos__info">
          <h3 className="title" title="Muy pronto">
            Barbero misterioso
          </h3>
          <p>?</p>
        </div>
      </div>
    )
  }

  return (
    <div className="barberos__item" title={titulo}>
      <div className="barberos__imagen">
        <img src={imagen} alt={nombre} />
      </div>
      <div className="barberos__info">
        <h3 className="title" title={nombre}>
          {nombre}
        </h3>
        <p>{especialidades}</p>
      </div>
    </div>
  )
}

export default Barbero
