import Icon from './Icon'
import WeatherIcon from './WeatherIcon'
import { formatTime, getWeather, temperature } from '../data/weather'

export default function CurrentWeather({ weather, place, unit, loading, updatedAt }) {
  const current = weather?.current
  const [description, icon] = current ? getWeather(current.weather_code) : ['Loading weather', 'sun']
  const sunrise = weather?.daily.sunrise[0]
  const sunset = weather?.daily.sunset[0]
  const daylightMinutes = sunrise && sunset ? minutesBetween(sunrise, sunset) : 0
  const elapsedMinutes = sunrise && current ? minutesOfDay(current.time) - minutesOfDay(sunrise) : 0
  const daylightProgress = daylightMinutes ? Math.min(100, Math.max(0, (elapsedMinutes / daylightMinutes) * 100)) : 0

  return (
    <section className="relative min-h-[250px] overflow-hidden rounded-[13px] bg-gradient-to-br from-[#324e6b] via-[#496984] to-[#69849a] px-[18px] py-[17px] text-white shadow-[0_8px_20px_#314f6916] md:px-[25px] md:py-[19px]" aria-label="Current weather">
      <div className="pointer-events-none absolute -left-[10%] -top-[320px] size-[460px] rounded-full border border-white/5" />
      <div className="relative z-10 flex justify-between text-[8px] font-semibold tracking-[1px] text-[#d3dee6] md:text-[9px]">
        <span className="flex items-center gap-[7px]"><span className="size-1.5 rounded-full bg-[#7ee1bb] shadow-[0_0_0_3px_#7ee1bb22]" /> LIVE WEATHER</span>
        <span>{updatedAt ? `Updated ${updatedAt}` : 'Fetching latest forecast'}</span>
      </div>
      <div className="relative z-10 grid min-h-[190px] grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[1fr_.55fr_200px] lg:grid-cols-[1fr_.8fr_220px]">
        <div className="min-w-0">
          <div className="flex max-w-[350px] items-center gap-1.5 overflow-hidden text-xs text-[#e3ebf0]">
            <span className="shrink-0 text-[#f2c168]"><Icon name="pin" size={17} /></span>
            <span className="truncate">{place.name}{place.admin1 ? `, ${place.admin1}` : ''}{place.country ? `, ${place.country}` : ''}</span>
          </div>
          <div className="mb-[-7px] ml-[-5px] mt-2 text-[64px] font-light leading-[1.08] tracking-[-7px] sm:text-[72px] md:text-[clamp(67px,8vw,91px)]">
            {loading && !current ? '--°' : temperature(current?.temperature_2m ?? 0, unit)}<span className="relative top-[-20px] ml-[7px] text-lg font-normal tracking-normal text-[#d1dce4] md:top-[-28px] md:text-[22px]">{unit}</span>
          </div>
          <p className="mb-1 mt-2 text-[15px] font-medium">{loading && !current ? 'Loading conditions...' : description}</p>
          <p className="m-0 text-[11px] text-[#cedae3]">Feels like <strong className="font-semibold text-white">{current ? temperature(current.apparent_temperature, unit) : '--°'}</strong></p>
        </div>
        <div className="col-start-2 row-start-1 grid place-items-center text-[#f5c769] md:col-start-auto md:row-auto">
          <WeatherIcon type={icon} size={136} className="h-[75px] w-[75px] drop-shadow-[0_8px_12px_#112c4224] sm:h-[92px] sm:w-[92px] md:h-[110px] md:w-[110px] lg:h-[136px] lg:w-[136px]" />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-3 rounded-[10px] border border-white/10 bg-white/5 px-3 py-[11px] backdrop-blur md:col-span-1 md:block md:px-[15px] md:py-[15px]">
          <div className="mb-3 hidden text-[9px] font-bold tracking-[1px] text-[#d3dfe7] md:block">TODAY’S SUN</div>
          <SunTime icon="sunrise" label="Sunrise" value={sunrise ? formatTime(sunrise, weather.timezone, { hour: 'numeric', minute: '2-digit' }) : '--:--'} />
          <SunTime icon="sunset" label="Sunset" value={sunset ? formatTime(sunset, weather.timezone, { hour: 'numeric', minute: '2-digit' }) : '--:--'} />
          <div className="mt-[15px] hidden h-1 overflow-hidden rounded bg-white/20 md:block"><span className="block h-full rounded bg-gradient-to-r from-[#f8d47d] to-[#f3a570]" style={{ width: `${daylightProgress}%` }} /></div>
          <div className="mt-[7px] hidden justify-between text-[9px] text-[#d3dfe7] md:flex"><span>Daylight</span><span>{formatDuration(daylightMinutes)}</span></div>
        </div>
      </div>
    </section>
  )
}

function minutesBetween(start, end) {
  const difference = minutesOfDay(end) - minutesOfDay(start)
  return difference < 0 ? difference + 24 * 60 : difference
}

function minutesOfDay(dateTime) {
  const [, time = '00:00'] = dateTime.split('T')
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function formatDuration(minutes) {
  return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m`
}

function SunTime({ icon, label, value }) {
  return <div className="my-0.5 grid grid-cols-[23px_1fr_auto] items-center gap-1.5 text-[10px] text-[#d3dfe7] md:my-[10px]">
    <span className={icon === 'sunset' ? 'text-[#edb77b]' : 'text-[#f5c66c'}><Icon name={icon} size={19} /></span>
    <span>{label}</span><strong className="text-[11px] font-semibold text-white">{value}</strong>
  </div>
}
