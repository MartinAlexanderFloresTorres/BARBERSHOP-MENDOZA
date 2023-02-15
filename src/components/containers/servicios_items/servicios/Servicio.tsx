import { useEffect, useState } from 'react'
import useMain from '../../../../hooks/useMain'
import { MinusSvg, PlusSvg, TrashSvg } from '../../../../assets/svg'
import { formatMoney } from '../../../../helpers'
import { ServicioType } from '../../../../types'

interface ServicioProps {
  servicio: ServicioType
  resumen: boolean
}

const Servicio = ({ servicio, resumen }: ServicioProps): JSX.Element => {
  // Estado de seleccion
  const [selected, setSelected] = useState(false)
  const [cantidad, setCantidad] = useState(0)

  // useMain
  const { carrito, addCart, deleteCart } = useMain()

  useEffect(() => {
    // Si el servicio esta en el carrito
    const existe = carrito.find(item => item.id === servicio.id)

    if (existe != null) {
      setSelected(true)
      setCantidad(existe.cantidad)
    } else {
      setSelected(false)
    }
  }, [])

  // Funcion para seleccionar
  const handleSelect = (): void => {
    if (!selected) {
      addCart({ ...servicio, cantidad: 1 })
      setCantidad(1)
    } else {
      deleteCart({ ...servicio, cantidad: 0 })
      setCantidad(0)
    }

    setSelected(!selected)
  }

  // Handle para agregar al carrito
  const handleAddCart = (): void => {
    // Si la cantidad es 0
    if (cantidad >= 0) {
      setSelected(true)
    }

    // Si la cantidad es menor al stock
    if (cantidad < servicio.stock) {
      // Limite de 5
      if (cantidad < 5) {
        setCantidad(cantidad => cantidad + 1)
        addCart({ ...servicio, cantidad: cantidad + 1 })
      }
    }
  }

  // Handle para disminuir del carrito
  const handleDeleteCart = (): void => {
    // Si la cantidad es 1
    if (cantidad === 1) {
      deleteCart(servicio)
      setSelected(false)
    }

    // Si la cantidad es mayor a 0
    if (cantidad > 0) {
      setCantidad(cantidad - 1)
      addCart({ ...servicio, cantidad: cantidad - 1 })
    }
  }

  return (
    <article key={servicio.id} className={`servicios_servicio ${servicio.stock > 0 ? '' : 'agotado'} ${selected && !resumen ? 'selecionado' : ''}`}>
      <img src={servicio.imagen} alt={servicio.servicio} />

      <div className="servicios_servicioCantidad">
        <button disabled={servicio.stock <= 0} onClick={handleDeleteCart}>
          <MinusSvg />
        </button>
        <p>{cantidad}</p>
        <button disabled={servicio.stock <= 0} onClick={handleAddCart}>
          <PlusSvg />
        </button>
      </div>

      <h2>{servicio.servicio}</h2>
      {!resumen && <p>{servicio.descripcion}</p>}

      <div className="servicios_barberos">
        {servicio.barberos.map(barbero => (
          <div key={barbero.id} className="servicios_barbero">
            <img className="servicios_barberoImagen" src={barbero.imagen} alt={barbero.imagen} />
            <p>{barbero.nombre}</p>
          </div>
        ))}
      </div>

      {servicio.stock > 0 ? (
        resumen ? (
          <button className="btn-black title" onClick={() => deleteCart(servicio)} title="Quitar">
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
