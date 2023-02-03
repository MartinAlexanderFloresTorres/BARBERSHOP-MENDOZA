import useGetCitas from '../../../hooks/useGetCitas'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { colores } from '../../../constants'
import { EstadoType } from '../../../types'
import { LoaderSvg } from '../../../assets/svg'
import '../../../styles/ReportesPage.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const ReportesPage = (): JSX.Element => {
  // UseGetCitas
  const { loadingCitas, citas } = useGetCitas()

  const labels = [...new Set(citas.map(cita => cita.estado))]

  const serviciosEstados = citas.map(cita => {
    const { estado } = cita
    return estado
  })

  const estadosContados = serviciosEstados.reduce<{ [key: string]: number }>((acc, estado) => {
    if (acc[estado]) {
      acc[estado]++
    } else {
      acc[estado] = 1
    }
    return acc
  }, {})

  const estados = Object.entries(estadosContados).map(([key, value]) => {
    return { key, value }
  })

  const c = estados.map(estado => {
    const key = estado.key as EstadoType
    return colores[key]
  })

  const backgroundColor = c.map(b => b.background)
  const borderColor = c.map(b => b.color)

  const data = {
    labels,
    datasets: [
      {
        label: 'Citas por estado',
        data: estados,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  }
  return (
    <>
      <section className="ReportesPage">
        {loadingCitas ? (
          <div className="loader__center">
            <LoaderSvg />
          </div>
        ) : (
          <div className="ReportesPage__center">
            <h2>Estados de citas</h2>
            <Doughnut data={data} />
          </div>
        )}
      </section>
    </>
  )
}

export default ReportesPage
