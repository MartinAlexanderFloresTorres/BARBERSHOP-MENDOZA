import { useEffect } from 'react'
import Barberos from '../../components/containers/barberos/Barberos'
import Presentacion from '../../components/containers/presentacion/Presentacion'
import Categorias from '../../components/containers/categorias/Categorias'

const HomePage = (): JSX.Element => {
  // Efecto de scroll al inicio
  useEffect(() => {
    // Scroll al inicio
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Presentacion />
      <Categorias />
      <Barberos />
    </>
  )
}

export default HomePage
