export const popupSystem = {
  overlay: {
    strong: 'fixed inset-0 z-[190] bg-black/80',
    soft: 'fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]',
  },
  frame: {
    base: 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[32px] border-none bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] outline-none',
    library: 'z-[191] w-[min(92vw,1040px)] max-h-[88vh]',
    profile: 'z-[191] w-[min(88vw,560px)] max-h-[88vh]',
    summary: 'z-[201] w-[min(92vw,560px)]',
  },
  header: {
    base: 'flex h-16 shrink-0 items-center justify-between border-b border-radius-blue/10 bg-radius-blue/5 px-6 py-4',
    iconWrap: 'flex h-9 w-9 items-center justify-center rounded-xl border border-radius-blue/10 bg-white text-radius-blue shadow-sm',
    title: 'text-sm font-black uppercase tracking-[0.2em] text-gray-900',
    subtitle: 'mt-0.5 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400',
    close: 'flex h-8 w-8 items-center justify-center text-[#5B647A] outline-none transition-colors hover:text-[#232943]',
  },
  footer: {
    base: 'flex items-center justify-between border-t border-[#E8ECF6] bg-white px-7 py-4',
    secondary: 'text-[10px] font-black uppercase tracking-[0.2em] text-[#A3ABC2] transition-colors hover:text-[#232943]',
    primary:
      'flex h-10 min-w-[210px] items-center justify-center gap-2 rounded-xl bg-[#E8EAF0] px-10 text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-xl shadow-radius-blue/20 transition-all hover:bg-[#DCE0EA] disabled:cursor-not-allowed disabled:bg-[#E8EAF0] enabled:bg-radius-blue enabled:hover:bg-[#4D56DB] enabled:focus:scale-95 enabled:active:scale-90',
  },
} as const;

