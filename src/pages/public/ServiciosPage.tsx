import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Sweetalert from 'sweetalert2'
import { db } from '../../firebase'
import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import ServiciosItem from '../../components/containers/servicios_items/ServiciosItem'
import InformacionCitaItem from '../../components/containers/servicios_items/InformacionCitaItem'
import ResumenItem from '../../components/containers/servicios_items/ResumenItem'
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
  const { isValidForm, carrito, resetCart, handleCita, item, changeItem, cita, user, EditServicio } = useMain()

  // useLocation para obtener la ruta actual
  const location = useLocation()

  // useNavigate
  const navigate = useNavigate()

  // useAuth
  const auth = useAuth()

  // Efecto de cambio de item
  useEffect(() => {
    // Scroll al inicio
    window.scrollTo(0, 0)
    // Si el carrito esta vacio, cambiar a item 1
    if (carrito.length === 0) {
      changeItem(1)
    }
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
    newcita.servicios.forEach(async (servicio: ServicioType) => {
      i += 1
      // Actualizar stock
      if (servicio.stock > 0) {
        const serv = { ...servicio, stock: servicio.stock - 1 }

        await EditServicio(serv)
      } else {
        console.log('No hay stock')
      }
    })

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
      }
      // Validar datos
      if (Object.values(cita).includes('')) {
        return changeItem(2)
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
            // Agregar cita
            console.log('add')

            await addCita(newcita)
            // Mostrar alerta de cita reservada
            handleAlerta({ mensaje: 'Cita reservada', tipo: 'success' })

            // Resetear carrito
            resetCart()
            // Resetear cita
            handleCita(() => DEFAULT_STATE_CITA)

            // Redireccionar a servicios
            changeItem(1)
            break
          }
        }
      } catch (error) {
        console.error(error)
        handleAlerta({ mensaje: 'Error al reservar cita', tipo: 'error' })
      }

      setLoading(false)
    } else {
      navigate('/login', { state: location })
    }
  }

  return (
    <section className="serviciosPage container">
      <section className="servicios__grid">
        <div className="servicios__navegacion">
          <button className={item === 1 ? 'active' : ''} onClick={() => changeItem(1)}>
            Servicios
          </button>
          <button className={item === 2 ? 'active' : ''} onClick={() => changeItem(2)}>
            Información citas
          </button>
          <button className={item === 3 ? 'active' : ''} onClick={() => changeItem(3)}>
            Resumen {carrito.length > 0 && `(${carrito.length})`}
          </button>
        </div>

        {item === 1 ? <ServiciosItem /> : item === 2 ? <InformacionCitaItem /> : <ResumenItem />}

        <div className="servicios__botones">
          {item === 1 ? (
            <button onClick={() => changeItem(2)} className="btn-primary ml-auto">
              <span>Siguiente</span>
              <ChevronRigthtSvg />
            </button>
          ) : item === 2 ? (
            <>
              <button onClick={() => changeItem(1)} className="btn-primary mr-auto">
                <ChevronLeftSvg />
                <span>Anterior</span>
              </button>
              {isValidForm && (
                <button onClick={() => changeItem(3)} className="btn-primary">
                  <span>Siguiente</span>
                  <ChevronRigthtSvg />
                </button>
              )}

              {!auth && (
                <section className="servicios__auth">
                  <button className="btn-black" onClick={() => navigate('/auth/login', { state: location })}>
                    Debes iniciar sesión
                  </button>

                  <section className="servicios__authContainer">
                    <button className="btn-primary" onClick={() => navigate('/auth/login', { state: location })}>
                      Email <MailSvg />
                    </button>
                    <RedesAuth />
                  </section>
                </section>
              )}
            </>
          ) : (
            <>
              <button onClick={() => changeItem(2)} className="btn-primary">
                <ChevronLeftSvg />
                <span>Anterior</span>
              </button>

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

              {!auth && (
                <section className="servicios__auth">
                  <button className="btn-black" onClick={() => navigate('/auth/login', { state: location })}>
                    Debes iniciar sesión
                  </button>

                  <section className="servicios__authContainer">
                    <button className="btn-primary" onClick={() => navigate('/auth/login', { state: location })}>
                      Email <MailSvg />
                    </button>
                    <RedesAuth />
                  </section>
                </section>
              )}
            </>
          )}
        </div>
      </section>
    </section>
  )
}

export default ServiciosPage
