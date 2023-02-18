import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import Sweetalert from 'sweetalert2'
import { db } from '../../firebase'
import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import useMain from '../../hooks/useMain'
import useAuth from '../../hooks/useAuth'
import RedesAuth from '../../components/containers/redes/RedesAuth'
import { DEFAULT_STATE_CITA } from '../../contexts/MainContext'
import { ChevronLeftSvg, ChevronRigthtSvg, MailSvg, LoaderSvg, CalendarSvg } from '../../assets/svg'
import { AlertInterface, ServicioCitaType, ServicioType } from '../../types'
import '../../styles/ServiciosPage.css'

interface ServiciosPageProps {
  alerta: AlertInterface
}

const ServiciosPage = (): JSX.Element => {
  // Estados
  const [loading, setLoading] = useState<boolean>(false)

  // useMain
  const { isValidForm, carrito, resetCart, handleCita, cita, user, EditServicio } = useMain()

  // useLocation para obtener la ruta actual
  const location = useLocation()
  const { pathname } = location

  // useNavigate
  const navigate = useNavigate()

  // useAuth
  const auth = useAuth()

  // Efecto de cambio de item
  useEffect(() => {
    // Scroll al inicio
    window.scrollTo(0, 0)
  }, [])

  // Manejar alerta
  const handleAlerta = ({ mensaje, tipo }: ServiciosPageProps['alerta']): void => {
    if (mensaje !== '') {
      void Sweetalert.fire({
        title: mensaje,
        icon: tipo,
        confirmButtonText: 'Aceptar',
      })
    }
  }

  // Agregar cita a firebase
  const addCita = async (newcita: ServicioCitaType): Promise<void> => {
    let i = 0
    // Actualizar stock de servicios
    newcita.servicios.forEach(async (servicio: ServicioType) => {
      // aumentar cantidad de servicios
      i += 1
      // Actualizar stock
      if (servicio.stock > 0) {
        const serv = { ...servicio, stock: servicio.stock - servicio.cantidad }

        await EditServicio(serv)
      } else {
        console.log('No hay stock')
      }
    })

    // Si i es mayor a 0, agregar cita
    if (i > 0) {
      // Agregar cita a firebase
      await addDoc(collection(db, 'citas'), newcita)
    }
  }

  // Reservar cita
  const handleReservar = async (): Promise<void> => {
    if (auth) {
      const newcita: ServicioCitaType = {
        user: user?.uid ?? '',
        pagado: false,
        estado: 'pendiente',
        ...cita,
        servicios: carrito,
        createdAt: new Date(),
      }
      // Validar datos
      if (Object.values(cita).includes('')) {
        console.log('Faltan datos')
      }

      setLoading(true)
      try {
        const querySnapshot = await getDocs(query(collection(db, 'citas')))

        const servicios = querySnapshot.docs.map(doc => doc.data())

        // Si servicios esta vacio, agregar cita
        if (servicios.length === 0) {
          await addCita(newcita)
          handleAlerta({ mensaje: 'Cita reservada', tipo: 'success' })
          return
        }

        // Si servicios no esta vacio, validar que no halla un servicio en ese rango de hora
        for (let index = 0; index < servicios.length; index++) {
          const hoy = new Date()
            .toLocaleString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })
            .split('/')
            .reverse()
            .join('-')

          const yearHoy = Number(hoy.split('-')[0])
          const mesHoy = Number(hoy.split('-')[1])
          const diaHoy = Number(hoy.split('-')[2])

          const year = Number(servicios[index].fecha.split('-')[0])
          const mes = Number(servicios[index].fecha.split('-')[1])
          const dia = Number(servicios[index].fecha.split('-')[2])

          const hora = Number(servicios[index].hora.split(':')[0])
          const minutos = Number(servicios[index].hora.split(':')[1])

          const horaCita = Number(newcita.hora.split(':')[0])
          const minutosCita = Number(newcita.hora.split(':')[1])

          const diaCita = Number(newcita.fecha.split('-')[2])
          const mesCita = Number(newcita.fecha.split('-')[1])
          const yearCita = Number(newcita.fecha.split('-')[0])

          // Que la hora de la cita no sea menor a la hora actual
          if (horaCita < 11 || horaCita > 19 || (horaCita < 11 && minutosCita < 30) || (horaCita > 19 && minutosCita > 30)) {
            handleAlerta({
              mensaje: 'La hora de la cita debe estar entre las 11:30 y las 19:30',
              tipo: 'error',
            })
            break
          }

          // Que la fecha de la cita no sea menor a la fecha actual
          if (yearCita < yearHoy) {
            handleAlerta({
              mensaje: 'El año de la cita no puede ser menor al año actual',
              tipo: 'error',
            })
            break
          }

          // Que la fecha de la cita no sea menor a la fecha actual
          if (mesCita < mesHoy) {
            handleAlerta({
              mensaje: 'El mes de la cita no puede ser menor al mes actual',
              tipo: 'error',
            })
            break
          }

          // Que la fecha de la cita no sea menor a la fecha actual
          if (diaCita < diaHoy) {
            handleAlerta({
              mensaje: 'El dia de la cita no puede ser menor al dia actual',
              tipo: 'error',
            })
            break
          }

          // Validar que no halla un servicio con minimos 30 minutos de diferencia
          if (year === yearCita && mes === mesCita && dia === diaCita && hora === horaCita && minutosCita < minutos + 30) {
            handleAlerta({
              mensaje: 'la cita no puede ser menor a 30 minutos de diferencia con otro servicio',
              tipo: 'error',
            })
            break
          }

          // Si es el ultimo servicio, agregar cita
          if (index === servicios.length - 1) {
            // Agregar cita a firebase
            await addCita(newcita)
            // Mostrar alerta de cita reservada
            handleAlerta({ mensaje: 'Cita reservada', tipo: 'success' })

            // Resetear carrito
            resetCart()
            // Resetear cita
            handleCita(() => DEFAULT_STATE_CITA)

            // Redireccionar a servicios
            navigate('/servicios')
            break
          }
        }
      } catch (error) {
        console.error(error)
        handleAlerta({ mensaje: 'Error al reservar cita', tipo: 'error' })
      }

      setLoading(false)
    } else {
      navigate('/auth/login', { state: location })
    }
  }

  return (
    <section className="serviciosPage container">
      <section className="servicios__grid">
        <div className="servicios__navegacion">
          <Link to={'/servicios'} className={pathname === '/servicios' ? 'active' : ''}>
            Servicios
          </Link>
          <Link to={'/servicios/informacion'} className={pathname === '/servicios/informacion' ? 'active' : ''}>
            Información citas
          </Link>
          <Link to={'/servicios/resumen'} className={pathname === '/servicios/resumen' ? 'active' : ''}>
            Resumen {carrito.length > 0 && `(${carrito.length})`}
          </Link>
        </div>

        <Outlet />

        <div className="servicios__botones">
          {pathname === '/servicios' && carrito.length > 0 && (
            <Link to={'/servicios/informacion'} state={location} className="btn-primary ml-auto">
              <span>Siguiente</span>
              <ChevronRigthtSvg />
            </Link>
          )}

          {pathname === '/servicios/informacion' && (
            <>
              <Link to={'/servicios'} state={location} className="btn-primary mr-auto">
                <ChevronLeftSvg />
                <span>Anterior</span>
              </Link>
              {isValidForm && (
                <Link to={'/servicios/resumen'} state={location} className="btn-primary">
                  <span>Siguiente</span>
                  <ChevronRigthtSvg />
                </Link>
              )}
            </>
          )}

          {pathname === '/servicios/resumen' && (
            <>
              <Link to={'/servicios/informacion'} className="btn-primary">
                <ChevronLeftSvg />
                <span>Anterior</span>
              </Link>

              {carrito.length > 0 && auth && (
                <button className="btn-black" onClick={async () => await handleReservar()} disabled={loading}>
                  {loading ? (
                    <>
                      Reservando <LoaderSvg />
                    </>
                  ) : (
                    <>
                      Reservar <CalendarSvg />
                    </>
                  )}
                </button>
              )}
            </>
          )}

          {(pathname === '/servicios/resumen' || pathname === '/servicios/informacion') && !auth && (
            <section className="servicios__auth">
              <Link to={'/auth/login'} state={location} className="btn-black">
                Debes iniciar sesión
              </Link>

              <section className="servicios__authContainer">
                <Link to={'/auth/login'} state={location} className="btn-primary">
                  Email <MailSvg />
                </Link>
                <Link to={location.pathname} state={location}>
                  <RedesAuth />
                </Link>
              </section>
            </section>
          )}
        </div>
      </section>
    </section>
  )
}

export default ServiciosPage
