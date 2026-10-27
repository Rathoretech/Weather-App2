import { useCallback, useEffect, useMemo, useState } from 'react'
import CurrentWeather from './components/CurrentWeather'
import { DailyForecast, HourlyForecast } from './components/ForecastPanels'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import WeatherMetrics from './components/WeatherMetrics'
import Icon from './components/Icon'

const INITIAL_PLACE = {
  name: 'New York',
  country: 'United States',
  latitude: 40.7128,
  longitude: -74.006,
}

async function fetchForecast(location) {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,dew_point_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure',
    hourly: 'temperature_2m,precipitation_probability,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
    forecast_days: '7',
    timezone: 'auto',
  })
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
  if (!response.ok) throw new Error('Weather data is temporarily unavailable. Please try again.')
  const data = await response.json()
  if (!data.current || !data.hourly || !data.daily) {
    throw new Error('The weather service returned incomplete data. Please try again.')
  }
  return data
}

async function searchLocation(city) {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`)
  if (!response.ok) throw new Error('City search is unavailable. Please try again.')
  const result = (await response.json()).results?.[0]
  if (!result) throw new Error(`We couldn't find "${city}". Try another city name.`)
  return {
    name: result.name,
    country: result.country ?? '',
    latitude: result.latitude,
    longitude: result.longitude,
    admin1: result.admin1,
  }
}

export default function App() {
  const [weather, setWeather] = useState(null)
  const [place, setPlace] = useState(INITIAL_PLACE)
  const [query, setQuery] = useState('')
  const [unit, setUnit] = useState('C')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')

  const loadWeather = useCallback(async (location) => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchForecast(location)
      setWeather(data)
      setPlace(location)
      setUpdatedAt(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
      return true
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load weather. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadWeather(INITIAL_PLACE)
  }, [loadWeather])

  const nowIndex = useMemo(() => {
    if (!weather) return 0
    const currentHour = weather.current.time.slice(0, 13)
    const found = weather.hourly.time.findIndex((time) => time.startsWith(currentHour))
    return Math.max(found, 0)
  }, [weather])

  async function searchCity(event) {
    event.preventDefault()
    const city = query.trim()
    if (!city) return
    setLoading(true)
    setError('')
    try {
      const location = await searchLocation(city)
      if (await loadWeather(location)) setQuery('')
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to search for that city.')
      setLoading(false)
    }
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setError('Location services are not supported by this browser.')
      return
    }
    setLoading(true)
    setError('')
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      loadWeather({
        name: 'My location',
        country: '',
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
    }, () => {
      setError('Location access was denied. You can search for a city instead.')
      setLoading(false)
    })
  }

  const current = weather?.current
  return (
    <main className="min-h-screen bg-[#f7f8fa] md:grid md:grid-cols-[248px_minmax(0,1fr)]">
      <Sidebar unit={unit} onUnitChange={setUnit} onLocate={useMyLocation} />
      <section className="min-w-0">
        <TopBar query={query} onQueryChange={setQuery} onSearch={searchCity} onLocate={useMyLocation} loading={loading} />
        <div className="mx-auto w-full max-w-[1250px] px-[14px] pb-6 pt-[27px] sm:px-5 md:px-7 md:pt-[35px] xl:px-[72px]">
          {error && <div className="mb-5 flex items-center justify-between gap-4 rounded-lg border border-[#f2d0c9] bg-[#fff5f2] px-4 py-3 text-xs text-[#873e32]" role="alert">{error}<button className="grid size-7 place-items-center rounded-md text-inherit hover:bg-[#f9e4df]" onClick={() => setError('')} aria-label="Dismiss error"><Icon name="close" size={16} /></button></div>}
          <div className="mb-5 flex items-end justify-between gap-5 md:mb-6">
            <div>
              <p className="mb-2 mt-0 text-[10px] font-bold tracking-[1.4px] text-[#9ca6b1]">YOUR DAILY FORECAST</p>
              <h1 className="m-0 text-[27px] font-semibold tracking-[-1.3px] text-[#20354c] md:text-[34px]">Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}<span className="text-[#e8ad4c]">.</span></h1>
              <p className="mb-0 mt-[7px] text-[11px] text-[#8995a2] md:text-xs">Here’s what the sky has in store for you.</p>
            </div>
            <div className="mb-[3px] max-w-[120px] rounded-lg border border-[#e8ebee] bg-white px-2 py-2 text-center text-[9px] text-[#667588] sm:max-w-none sm:px-[13px] sm:text-[11px]">
              {new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}
            </div>
          </div>
          <CurrentWeather weather={weather} place={place} unit={unit} loading={loading} updatedAt={updatedAt} />
          <WeatherMetrics current={current} unit={unit} />
          <div className="grid grid-cols-1 gap-[15px] lg:grid-cols-[minmax(0,1.55fr)_minmax(285px,.95fr)]">
            <HourlyForecast weather={weather} startIndex={nowIndex} unit={unit} loading={loading} />
            <DailyForecast weather={weather} unit={unit} loading={loading} />
          </div>
          <footer className="mt-[21px] flex justify-between gap-3 text-[9px] text-[#a0a9b2] sm:text-[10px]">
            <span>Live weather for <strong className="font-semibold text-[#718095]">{place.name}</strong></span>
            <span>Weather data by <a className="text-[#718ba2] no-underline hover:underline" href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a></span>
          </footer>
        </div>
      </section>
    </main>
  )
}
