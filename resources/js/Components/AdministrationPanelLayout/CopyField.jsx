import { useState } from "react";
import { Check, Copy, Eye, EyeOff } from "lucide-react";

export default function CopyField({ label, value, secret = false }) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(!secret);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      /* clipboard blocked */
    }
  };

  return (
    <div>
      <p className="mb-1 text-xs text-slate-500">{label}</p>
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2">
        <span className="flex-1 truncate font-mono text-[13px] text-slate-800">
          {visible ? value : "•".repeat(Math.min(value.length, 28))}
        </span>
        {secret && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="text-slate-400 hover:text-slate-700"
            aria-label={visible ? "Hide" : "Show"}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
        <button
          type="button"
          onClick={copy}
          className="text-slate-400 hover:text-slate-700"
          aria-label="Copy"
        >
          {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
}
