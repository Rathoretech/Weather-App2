const paths = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></>,
  pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  wind: <><path d="M3 8h12a3 3 0 1 0-3-3M2 12h17a3 3 0 1 1-3 3M4 16h7" /></>,
  drop: <><path d="M12 3.5S5 11 5 15a7 7 0 0 0 14 0c0-4-7-11.5-7-11.5Z" /><path d="M9 16a3 3 0 0 0 3 3" /></>,
  gauge: <><path d="M4.9 19a9 9 0 1 1 14.2 0" /><path d="m12 13 4-4M12 13l-2 2" /><circle cx="12" cy="13" r="1" /></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
  cloud: <><path d="M20 16.2A4.8 4.8 0 0 0 17 7h-1.2A7 7 0 1 0 4 16.3" /><path d="M8 16h.01M8 20h.01M12 18h.01M16 20h.01" /></>,
  sunrise: <><path d="M3 18h18M5 21h14M12 3v8M8 7l4-4 4 4M5 14a7 7 0 0 1 14 0" /></>,
  sunset: <><path d="M3 18h18M5 21h14M12 11V3M8 7l4 4 4-4M5 14a7 7 0 0 1 14 0" /></>,
  locate: <><circle cx="12" cy="12" r="8" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /><circle cx="12" cy="12" r="2" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  close: <><path d="m18 6-12 12M6 6l12 12" /></>,
}

export default function Icon({ name, size = 18 }) {
  const icon = paths[name]
  if (!icon) return null
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>
}
