import Icon from './Icon'
import WeatherIcon from './WeatherIcon'

export default function Sidebar({ unit, onUnitChange, onLocate }) {
  return (
    <aside className="sticky top-0 flex h-auto min-h-0 flex-row items-center gap-2 border-b border-[#eceef2] bg-white px-5 py-3 md:h-screen md:min-h-[700px] md:flex-col md:items-stretch md:border-b-0 md:border-r md:px-5 md:py-[31px]">
      <a className="mr-auto flex w-fit items-center gap-2.5 text-[21px] font-bold tracking-[-1.3px] text-[#15263a] no-underline md:mb-[62px] md:ml-1 md:mr-0 md:text-[23px]" href="#" aria-label="Atmos home">
        <span className="grid size-[35px] place-items-center rounded-xl bg-[#fff6e6] text-[#eab75d] md:size-[39px]"><WeatherIcon type="partly" size={27} /></span>
        <span>atmos<span className="text-[#e8ad4c]">.</span></span>
      </a>
      <div className="mb-3 ml-3 hidden text-[10px] font-bold tracking-[1.15px] text-[#9aa4b1] md:block">YOUR WEATHER</div>
      <button className="flex w-auto items-center gap-3 rounded-lg bg-transparent px-2 py-2.5 text-[0px] text-[#263d58] md:w-full md:px-3 md:text-[13px] md:font-semibold md:bg-[#f1f5f8]">
        <span className="grid place-items-center text-[#e2a947]"><Icon name="sunrise" /></span><span className="hidden md:inline">Overview</span>
      </button>
      <button className="hidden w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-[#697789] hover:bg-[#f1f5f8] hover:text-[#263d58] md:flex" onClick={onLocate}>
        <span className="grid place-items-center text-[#8190a0]"><Icon name="locate" /></span>My location
      </button>
      <div className="my-6 hidden h-px bg-[#edf0f3] md:block" />
      <div className="mb-3 ml-3 hidden text-[10px] font-bold tracking-[1.15px] text-[#9aa4b1] md:block">PREFERENCES</div>
      <div className="flex flex-col gap-3 p-0 text-[12px] text-[#556476] md:px-3 md:py-2">
        <span className="hidden md:inline">Temperature</span>
        <div className="grid grid-cols-2 rounded-lg bg-[#f1f3f5] p-[3px]" role="group" aria-label="Temperature unit">
          {['C', 'F'].map((value) => <button key={value} className={`rounded-md px-2 py-[7px] text-[12px] ${unit === value ? 'bg-white font-bold text-[#26384d] shadow-sm' : 'text-[#7d8996]'}`} onClick={() => onUnitChange(value)} aria-pressed={unit === value}>°{value}</button>)}
        </div>
      </div>
      <div className="mt-auto hidden rounded-xl border border-[#f0eee8] bg-[#fdfbf7] p-[17px_14px] md:mx-[7px] md:block">
        <div className="text-[#edb853]"><WeatherIcon type="sun" size={23} /></div>
        <p className="my-2.5 text-xs font-semibold leading-relaxed text-[#435367]">Weather, made<br />a little more beautiful.</p>
        <span className="text-[10px] text-[#9ba3ac]">Powered by Open-Meteo</span>
      </div>
    </aside>
  )
}
