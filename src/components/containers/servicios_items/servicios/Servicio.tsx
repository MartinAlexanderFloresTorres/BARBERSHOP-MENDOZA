import { useEffect, useState } from 'react'
import { ServicioInterface } from '../../../../providers/MainProvider'
import useMain from '../../../../hooks/useMain'
import { TrashSvg } from '../../../../assets/svg'
import { formatMoney } from '../../../../helpers'

interface ServicioProps {
  servicio: ServicioInterface
  resumen: boolean
}

const Servicio = ({ servicio, resumen }: ServicioProps): JSX.Element => {
  // Estado de seleccion
  const [selected, setSelected] = useState(false)

  // useMain
  const { carrito, addCart, deleteCart } = useMain()

  useEffect(() => {
    // Si el servicio esta en el carrito
    const existe = carrito.find(item => item.id === servicio.id)
    if (existe != null) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [])

  // Funcion para seleccionar
  const handleSelect = (): void => {
    if (!selected) {
      addCart(servicio)
    } else {
      deleteCart(servicio)
    }
    setSelected(!selected)
  }

  return (
    <article
      key={servicio.id}
      className={`servicios_servicio ${
        servicio.cantidad > 0 ? '' : 'agotado'
      } ${selected && !resumen ? 'selecionado' : ''}`}
    >
      <img src={servicio.imagen} alt={servicio.nombre} />
      <h2>{servicio.nombre}</h2>
      {!resumen && <p>{servicio.descripcion}</p>}

      {servicio.cantidad > 0 ? (
        resumen ? (
          <button
            className="btn-black title"
            onClick={() => deleteCart(servicio)}
            title="Quitar"
          >
            <TrashSvg />
          </button>
        ) : (
          <button className="btn-primary" onClick={handleSelect}>
            {selected ? 'Deseleccionar' : 'Seleccionar'}
          </button>
        )
      ) : (
        <div className="agotado">Agotado</div>
      )}
      <span>{formatMoney(servicio.precio)}</span>
    </article>
  )
}

export default Servicio