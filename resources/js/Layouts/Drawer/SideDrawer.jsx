import { isValidElement, useEffect } from "react";

/**
 * Dynamic right-side drawer driven by a config array.
 *
 * Layout: drawer ke andar LEFT column me icon + text rail (hamesha dikhta hai),
 * uske right me content area. Band hone par sirf rail dikhta hai,
 * click par poora drawer slide hokar khulta hai.
 *
 * items = [
 *   { key: "notes", label: "Notes", icon: NotesIcon, component: NotesPanel },
 *   { key: "help",  label: "Help",  icon: <HelpIcon className="h-5 w-5" />, component: <HelpPanel /> },
 *   { key: "empty", label: "Nothing" },   // component nahi -> render hi nahi hoga
 * ]
 *
 *  - key        : unique id
 *  - label      : rail me icon ke neeche text
 *  - icon       : component type ya ready element (dono chalte hain)
 *  - component  : component type ya ready element. Type ho to `onClose` prop milta hai.
 *  - title      : (optional) content header title, default = label
 *
 * Controlled: activeKey + onChange(key | null)
 */

function renderNode(node, props = {}) {
  if (!node) return null;
  if (isValidElement(node)) return node;
  if (typeof node === "function" || (typeof node === "object" && node.$$typeof)) {
    const Node = node;
    return <Node {...props} />;
  }
  return null;
}

export function getValidDrawers(items) {
  return (Array.isArray(items) ? items : []).filter(
    (item) => item && item.key && item.component
  );
}

export default function SideDrawer({ items = [], activeKey, onChange }) {
  const drawers = getValidDrawers(items);
  const active = drawers.find((d) => d.key === activeKey) || null;
  const close = () => onChange?.(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === "Escape" && onChange?.(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onChange]);

  // config me koi valid component nahi -> kuch bhi render nahi
  if (drawers.length === 0) return null;

  return (
    <aside
      className={`absolute inset-y-0 right-0 z-30 flex w-[min(384px,100%)] bg-white transition-transform duration-300 ${
        active ? "translate-x-0" : "translate-x-[calc(100%_-_4rem)]"
      }`}
    >
      {/* Left column: icon + text, full height, vertically + horizontally centered */}
      <nav className="flex w-16 shrink-0 flex-col items-center justify-center gap-1 overflow-y-auto bg-slate-50 py-3">
        {drawers.map((d) => {
          const isActive = d.key === activeKey;
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => onChange?.(isActive ? null : d.key)}
              aria-pressed={isActive}
              title={d.label}
              className={`flex w-14 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-center text-[10px] font-medium leading-tight transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {renderNode(d.icon, { className: "h-5 w-5" })}
              <span className="max-w-full truncate">{d.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right: content */}
      <div className="flex min-w-0 flex-1 flex-col" aria-hidden={!active}>
        {active && (
          <>
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <h2 className="truncate text-sm font-semibold text-slate-800">
                {active.title || active.label}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close drawer"
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M5.3 5.3a1 1 0 011.4 0L10 8.6l3.3-3.3a1 1 0 111.4 1.4L11.4 10l3.3 3.3a1 1 0 01-1.4 1.4L10 11.4l-3.3 3.3a1 1 0 01-1.4-1.4L8.6 10 5.3 6.7a1 1 0 010-1.4z" />
                </svg>
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              {renderNode(active.component, { onClose: close })}
            </div>
          </>
        )}
      </div>
    </aside>
  );
}