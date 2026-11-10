import { useEffect } from "react";
import { Check, Info, X } from "lucide-react";
import { useInfo } from "./InfoContext";

const TAG_TONES = {
  slate: "bg-slate-100 text-slate-700",
  violet: "bg-violet-100 text-violet-800",
  emerald: "bg-emerald-100 text-emerald-800",
  amber: "bg-amber-100 text-amber-800",
  rose: "bg-rose-100 text-rose-800",
  sky: "bg-sky-100 text-sky-800",
};

export default function InfoPanel() {
  const { data: info, open, close } = useInfo();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      {/* backdrop — sirf mobile/tablet par */}
      <div
        onClick={close}
        className={`absolute inset-0 z-30 bg-slate-900/40 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-hidden={!open}
        className={`absolute inset-y-0 right-0 z-40 flex w-full max-w-[400px] flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-700">
              <Info size={16} />
            </span>
            <h2 className="text-base font-semibold text-slate-900">{info?.title ?? "Information"}</h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            tabIndex={open ? 0 : -1}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          {info?.image && (
            <img
              src={info.image}
              alt={info.imageAlt ?? ""}
              className="w-full rounded-lg border border-slate-200 object-cover"
            />
          )}

          {info?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {info.tags.map((t) => (
                <span
                  key={t.label}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    TAG_TONES[t.tone] ?? TAG_TONES.slate
                  }`}
                >
                  {t.label}
                </span>
              ))}
            </div>
          )}

          {info?.description && (
            <p className="text-sm leading-relaxed text-slate-700">{info.description}</p>
          )}

          {info?.points?.length > 0 && (
            <ul className="space-y-2">
              {info.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-slate-700">
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}

          {info?.note && (
            <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
              {info.note}
            </div>
          )}

          {info?.link && (
            <a
              href={info.link.href}
              className="inline-block text-sm font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900"
            >
              {info.link.label}
            </a>
          )}

          {/* custom JSX chahiye? info.render me function do */}
          {typeof info?.render === "function" && info.render()}
        </div>
      </aside>
    </>
  );
}
