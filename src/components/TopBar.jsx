import Icon from './Icon'

export default function TopBar({ query, onQueryChange, onSearch, onLocate, loading }) {
  return (
    <header className="flex h-[65px] items-center gap-2.5 border-b border-[#eceef2] bg-white px-5 md:h-[78px] md:gap-[18px] md:px-7 xl:px-[72px]">
      <div className="mr-auto hidden text-xs text-[#9aa4b0] md:block">Weather <span className="px-2 text-[#c3c9cf]">/</span> <strong className="font-semibold text-[#405166]">Overview</strong></div>
      <form className="flex h-[39px] min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#e8ebee] bg-[#fbfcfd] px-3 text-[#8e9aa7] focus-within:border-[#b7c8d8] md:flex-none md:w-[min(295px,34vw)]" onSubmit={onSearch} role="search">
        <Icon name="search" size={19} />
        <input className="min-w-0 flex-1 bg-transparent text-xs text-[#34465b] outline-none placeholder:text-[#a4adb8]" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search any city..." aria-label="Search any city" />
        <button className="grid size-[27px] place-items-center rounded-md text-[#728397] hover:bg-[#edf2f6] hover:text-[#273f5a] disabled:opacity-50" type="submit" disabled={loading} aria-label="Search city"><Icon name="arrow" size={18} /></button>
      </form>
      <button className="hidden size-9 place-items-center rounded-lg border border-[#e9edf0] text-[#728397] hover:bg-[#edf2f6] hover:text-[#273f5a] sm:grid" onClick={onLocate} aria-label="Use my current location"><Icon name="locate" size={19} /></button>
      <div className="grid size-[34px] shrink-0 place-items-center rounded-full bg-[#526e89] text-xs font-bold text-white" aria-label="Weather dashboard">A</div>
    </header>
  )
}
