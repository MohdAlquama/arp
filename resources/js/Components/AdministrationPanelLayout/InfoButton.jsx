import { Info } from "lucide-react";
import { useInfo } from "./Info/InfoContext";

/**
 * Do tareeke se use karo:
 *   <InfoButton infoKey="amount" />                        -> layout ke `info` prop se content lega
 *   <InfoButton infoKey="x" info={{ hint, title, ... }} /> -> inline content (kahin bhi, kisi bhi page me)
 */
export default function InfoButton({ infoKey, info, className = "" }) {
  const { content, activeId, toggle } = useInfo();
  const data = info ?? content[infoKey];
  if (!data) return null;

  const id = infoKey ?? data.title;
  const isActive = activeId === id;
  const tipId = `tip-${id}`;

  return (
    <span className={`group relative inline-flex ${className}`}>
      <button
        type="button"
        onClick={() => toggle(id, data)}
        aria-label={`${data.title ?? "Info"} ki details dekhein`}
        aria-describedby={data.hint ? tipId : undefined}
        className={`inline-flex h-5 w-5 items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 ${
          isActive
            ? "bg-violet-700 text-white"
            : "text-slate-400 hover:bg-violet-100 hover:text-violet-700"
        }`}
      >
        <Info size={15} />
      </button>

      {data.hint && (
        <span
          id={tipId}
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-md bg-slate-900 px-3 py-2 text-xs font-normal leading-snug text-white opacity-0 shadow-lg transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100"
        >
          {data.hint}
          <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-slate-900" />
        </span>
      )}
    </span>
  );
}
