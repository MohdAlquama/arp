import { Link } from "@inertiajs/react";
import { CreditCard, Grid3x3, LogOut, Menu } from "lucide-react";

export default function Header({ onMenu, title = "Payment Gateway" }) {
  return (
    <header className="relative flex h-[62px] shrink-0 items-center justify-between border-t-4 border-amber-400 bg-[#1b1464] px-3 text-white sm:px-6">
      <div className="flex items-center gap-3 sm:gap-5">
        <button
          type="button"
          onClick={onMenu}
          className="text-white/80 hover:text-white md:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-400 text-lg font-black text-[#1b1464]">
          C
        </div>
        <button type="button" className="hidden text-white/80 hover:text-white sm:block" aria-label="Apps">
          <Grid3x3 size={20} />
        </button>
        <span className="hidden h-9 w-px bg-white/25 sm:block" />
        <div className="flex items-center gap-3">
          <div className="hidden h-7 w-7 items-center justify-center rounded bg-white/10 text-emerald-300 sm:flex">
            <CreditCard size={16} />
          </div>
          <span className="text-[15px] font-semibold tracking-tight sm:text-[17px]">{title}</span>
        </div>
      </div>

      <Link
        href={route("logout")}
        method="post"
        as="button"
        className="inline-flex items-center gap-2 rounded-md border border-white/30 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70"
      >
        <LogOut size={16} />
        <span className="hidden sm:inline">Logout</span>
      </Link>
    </header>
  );
}
