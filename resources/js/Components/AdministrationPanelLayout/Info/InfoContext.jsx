import { createContext, useCallback, useContext, useMemo, useState } from "react";

const InfoContext = createContext(null);

/**
 * Layout ke andar ek baar lagta hai. Isse koi bhi child/page/component
 * InfoButton se right panel khol sakta hai.
 *
 * content: { key: { hint, title, description, image, imageAlt, tags, points, note, link } }
 */
export function InfoProvider({ content = {}, children }) {
  const [activeId, setActiveId] = useState(null);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  const toggle = useCallback(
    (id, info) => {
      if (open && activeId === id) {
        setOpen(false); // same icon dobara click => band
        return;
      }
      setActiveId(id);
      setData(info);
      setOpen(true);
    },
    [open, activeId]
  );

  const value = useMemo(
    () => ({ content, data, open, activeId: open ? activeId : null, toggle, close }),
    [content, data, open, activeId, toggle, close]
  );

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
}

export function useInfo() {
  const ctx = useContext(InfoContext);
  if (!ctx) throw new Error("useInfo() ko <InfoProvider> / <DashboardLayout> ke andar use karein.");
  return ctx;
}
