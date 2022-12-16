import Snow from './Snow'
import './SnowContainer.css'

const snowflakes = Array.from({ length: 20 }, (_, i) => i)

const SnowContainer = (): JSX.Element => {
  return (
    <section className="SnowContainer">
      <div className="SnowShadow"></div>
      {snowflakes.map(snowflake => (
        <Snow key={snowflake} />
      ))}
    </section>
  )
}

export default SnowContainer
