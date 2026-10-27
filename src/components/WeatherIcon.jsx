export default function WeatherIcon({ type = 'sun', size = 48, className = '' }) {
  const common = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none', className, 'aria-hidden': true }
  if (type === 'sun') {
    return <svg {...common}><circle cx="32" cy="32" r="11" fill="currentColor" /><g stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M32 5v7M32 52v7M5 32h7M52 32h7M13 13l5 5M46 46l5 5M51 13l-5 5M18 46l-5 5" /></g></svg>
  }
  if (type === 'partly') {
    return <svg {...common}><circle cx="40" cy="22" r="9" fill="#F8C96A" /><path d="M19 48h29a9 9 0 0 0 0-18 13 13 0 0 0-25-3 10.5 10.5 0 0 0-4 21Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M19 48h29" stroke="#fff" strokeWidth="2" /></svg>
  }
  if (type === 'rain') {
    return <svg {...common}><path d="M15 38h34a9 9 0 0 0 0-18 13 13 0 0 0-25-3 10.5 10.5 0 0 0-9 21Z" fill="currentColor" /><g stroke="#78B8E8" strokeWidth="3" strokeLinecap="round"><path d="m23 45-3 7M34 45l-3 7M45 45l-3 7" /></g></svg>
  }
  if (type === 'snow') {
    return <svg {...common}><path d="M15 37h34a9 9 0 0 0 0-18 13 13 0 0 0-25-3 10.5 10.5 0 0 0-9 21Z" fill="currentColor" /><g fill="#9EC8EA"><circle cx="22" cy="48" r="2.5" /><circle cx="33" cy="52" r="2.5" /><circle cx="44" cy="47" r="2.5" /></g></svg>
  }
  if (type === 'storm') {
    return <svg {...common}><path d="M15 36h34a9 9 0 0 0 0-18 13 13 0 0 0-25-3 10.5 10.5 0 0 0-9 21Z" fill="currentColor" /><path d="m34 36-9 14h8l-3 10 13-17h-9l4-7Z" fill="#F5BC52" /></svg>
  }
  if (type === 'fog') {
    return <svg {...common}><path d="M16 31h31a8 8 0 0 0 0-16 12 12 0 0 0-23-3 9 9 0 0 0-8 19Z" fill="currentColor" /><g stroke="#A6B7C7" strokeWidth="3" strokeLinecap="round"><path d="M12 39h40M17 47h31M22 55h23" /></g></svg>
  }
  return <svg {...common}><path d="M15 39h34a9 9 0 0 0 0-18 13 13 0 0 0-25-3 10.5 10.5 0 0 0-9 21Z" fill="currentColor" /></svg>
}
