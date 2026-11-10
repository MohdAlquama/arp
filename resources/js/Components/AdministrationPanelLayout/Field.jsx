import InfoButton from "@/Components/Info/InfoButton";

/** Label + optional info icon + input (children). */
export default function Field({ label, htmlFor, infoKey, info, error, className = "", children }) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center gap-1.5">
        <label htmlFor={htmlFor} className="text-sm font-medium text-slate-800">
          {label}
        </label>
        {(infoKey || info) && <InfoButton infoKey={infoKey} info={info} />}
      </div>
      {children}
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
