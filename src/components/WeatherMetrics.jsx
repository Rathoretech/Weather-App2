import Icon from './Icon'
import { temperature } from '../data/weather'

const metrics = [
  { icon: 'wind', label: 'WIND SPEED', value: (current) => `${Math.round(current.wind_speed_10m)} km/h`, detail: (current) => `${windDirection(current.wind_direction_10m)} wind` },
  { icon: 'drop', label: 'HUMIDITY', value: (current) => `${current.relative_humidity_2m}%`, detail: (current, unit) => `Dew point ${temperature(current.dew_point_2m, unit)}${unit}` },
  { icon: 'gauge', label: 'PRESSURE', value: (current) => `${Math.round(current.surface_pressure)} hPa`, detail: 'Surface pressure' },
  { icon: 'cloud', label: 'PRECIPITATION', value: (current) => `${current.precipitation} mm`, detail: 'Current conditions' },
]

function windDirection(degrees) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return directions[Math.round(degrees / 45) % directions.length]
}

export default function WeatherMetrics({ current, unit }) {
  return (
    <section className="my-4 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-[13px]" aria-label="Weather details">
      {metrics.map((metric) => (
        <article className="min-w-0 rounded-[10px] border border-[#eceff1] bg-white p-3.5 md:px-4 md:py-[15px]" key={metric.label}>
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.8px] text-[#9aa5b0]">
            <span className="grid size-[27px] place-items-center rounded-lg bg-[#f1f5f7] text-[#6c8499]"><Icon name={metric.icon} size={18} /></span>
            {metric.label}
          </div>
          <strong className="my-2.5 block overflow-hidden text-ellipsis whitespace-nowrap text-[19px] font-semibold tracking-[-.5px] text-[#2b4057] md:text-[21px]">{current ? metric.value(current) : '—'}</strong>
          <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-[#9aa4af]">{current ? (typeof metric.detail === 'function' ? metric.detail(current, unit) : metric.detail) : metric.label === 'WIND SPEED' ? 'Wind direction' : metric.label === 'HUMIDITY' ? 'Dew point' : metric.detail}</span>
        </article>
      ))}
    </section>
  )
}
