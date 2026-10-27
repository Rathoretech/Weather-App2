import Icon from './Icon'
import WeatherIcon from './WeatherIcon'
import { formatTime, getWeather, temperature } from '../data/weather'

export function HourlyForecast({ weather, startIndex, unit, loading }) {
  const times = weather?.hourly.time.slice(startIndex, startIndex + 8) ?? []

  return (
    <section className="min-w-0 rounded-[10px] border border-[#eceff1] bg-white px-3 py-4 md:px-5 md:py-[19px]">
      <div className="mb-[18px] flex items-center justify-between gap-2.5">
        <div><h2 className="m-0 text-sm font-semibold text-[#30455c]">Today’s forecast</h2><p className="mb-0 mt-1 text-[10px] text-[#a0a9b3]">Hourly conditions</p></div>
        <a className="flex items-center gap-1.5 text-[10px] text-[#71859a] no-underline hover:text-[#2c4c6a]" href="#weekly-forecast">7 day forecast <Icon name="arrow" size={15} /></a>
      </div>
      <div className="grid grid-cols-4 gap-1.5 lg:grid-cols-8">
        {loading && !weather ? <div className="col-span-full py-7 text-center text-xs text-[#95a0ab]">Gathering your forecast...</div> : times.map((time, index) => {
          const hourIndex = startIndex + index
          const [condition, icon] = getWeather(weather.hourly.weather_code[hourIndex])
          return <div className={`flex flex-col items-center gap-2.5 rounded-[9px] border px-1 py-[11px] ${index === 0 ? 'border-[#eaf0f4] bg-[#f7f9fa]' : 'border-transparent'}`} key={time}>
            <span className="whitespace-nowrap text-[10px] text-[#8592a0]">{index === 0 ? 'Now' : formatTime(time, weather.timezone, { hour: 'numeric' })}</span>
            <WeatherIcon type={icon} size={34} className="text-[#8398aa]" />
            <span className="text-[13px] font-semibold text-[#33495f]">{temperature(weather.hourly.temperature_2m[hourIndex], unit)}</span>
            <span className="flex items-center gap-0.5 text-[9px] text-[#7ea8c4]"><Icon name="drop" size={12} /> {weather.hourly.precipitation_probability[hourIndex] ?? 0}%</span>
            <span className="sr-only">{condition}</span>
          </div>
        })}
      </div>
    </section>
  )
}

export function DailyForecast({ weather, unit, loading }) {
  const days = weather?.daily.time.slice(0, 5) ?? []

  return (
    <section className="min-w-0 rounded-[10px] border border-[#eceff1] bg-white px-3 py-4 md:px-5 md:py-[19px]" id="weekly-forecast">
      <div className="mb-[18px] flex items-center justify-between gap-2.5">
        <div><h2 className="m-0 text-sm font-semibold text-[#30455c]">5-day forecast</h2><p className="mb-0 mt-1 text-[10px] text-[#a0a9b3]">A little further ahead</p></div>
        <span className="grid size-[29px] place-items-center rounded-lg bg-[#fff7e8] text-[#e4ac50]"><Icon name="sun" size={18} /></span>
      </div>
      <div>
        {loading && !weather ? <div className="py-7 text-center text-xs text-[#95a0ab]">Gathering your forecast...</div> : days.map((day, index) => {
          const [condition, icon] = getWeather(weather.daily.weather_code[index])
          return <div className="grid min-h-[39px] grid-cols-[44px_31px_minmax(65px,1fr)_auto] items-center gap-[7px] border-b border-[#f0f2f4] last:border-0" key={day}>
            <span className="text-[10px] font-semibold text-[#485c70]">{index === 0 ? 'Today' : formatTime(day, weather.timezone, { weekday: 'short' })}</span>
            <WeatherIcon type={icon} size={27} className="text-[#8498a9]" />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[9px] text-[#95a0ab]">{condition}</span>
            <span className="flex gap-[9px] text-[10px] text-[#a3acb5]"><strong className="font-semibold text-[#40556b]">{temperature(weather.daily.temperature_2m_max[index], unit)}</strong><span>{temperature(weather.daily.temperature_2m_min[index], unit)}</span></span>
          </div>
        })}
      </div>
    </section>
  )
}
