import { useRef, useState } from "react";
import CopyField from "./CopyField";

const SHUTTER_HEIGHT = 300; // px — kitna neeche tak khulega

export default function TestEnvShutter() {
  const [height, setHeight] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ startY: 0, startH: 0, moved: 0 });

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startY: e.clientY, startH: height, moved: 0 };
    setDragging(true);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const dy = e.clientY - drag.current.startY;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dy));
    setHeight(Math.min(SHUTTER_HEIGHT, Math.max(0, drag.current.startH + dy)));
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (drag.current.moved < 4) {
      setHeight((h) => (h > 0 ? 0 : SHUTTER_HEIGHT)); // click => toggle
    } else {
      setHeight((h) => (h > SHUTTER_HEIGHT / 3 ? SHUTTER_HEIGHT : 0)); // snap
    }
  };

  const transition = dragging ? "none" : "height 320ms cubic-bezier(.2,.8,.2,1)";
  const innerTransition = dragging ? "none" : "transform 320ms cubic-bezier(.2,.8,.2,1)";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className="pointer-events-auto relative overflow-hidden border-b-4 border-amber-400 bg-amber-50 shadow-lg"
        style={{ height, transition }}
      >
        <div
          className="absolute inset-x-0 bottom-0 overflow-y-auto px-4 pb-6 pt-6 sm:px-8"
          style={{
            height: SHUTTER_HEIGHT,
            transform: `translateY(${height - SHUTTER_HEIGHT}px)`,
            transition: innerTransition,
          }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Test environment</h2>
                <p className="text-sm text-slate-600">
                  Yahan real paisa nahi katta. Integration test karne ke liye sandbox credentials
                  use karein.
                </p>
              </div>
              <button
                type="button"
                className="self-start rounded-md bg-[#1b1464] px-4 py-2 text-sm font-medium text-white hover:bg-[#2a1f8f]"
              >
                Switch to Prod
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-800">Test credentials</h3>
                <CopyField label="App ID" value="TEST10123456789abcdef" />
                <CopyField label="Secret key" value="cfsk_ma_test_9f8e7d6c5b4a3210" secret />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-800">Sandbox endpoints</h3>
                <CopyField label="API base URL" value="https://sandbox.cashfree.com/pg" />
                <CopyField label="Webhook URL" value="https://yourapp.test/webhooks/cashfree" />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-800">Test payment details</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="rounded-md border border-slate-200 bg-white px-3 py-2">
                    Card: <span className="font-mono">4111 1111 1111 1111</span>
                  </li>
                  <li className="rounded-md border border-slate-200 bg-white px-3 py-2">
                    Expiry / CVV: <span className="font-mono">12/30 · 123</span>
                  </li>
                  <li className="rounded-md border border-slate-200 bg-white px-3 py-2">
                    UPI: <span className="font-mono">testsuccess@gocash</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-label="Test environment. Drag down to open"
        aria-expanded={height > 0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setHeight((h) => (h > 0 ? 0 : SHUTTER_HEIGHT));
          }
        }}
        className={`pointer-events-auto absolute left-1/2 -translate-x-1/2 touch-none select-none whitespace-nowrap bg-amber-400 px-10 py-1.5 text-center text-[13px] font-semibold text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          top: height,
          transition: dragging ? "none" : "top 320ms cubic-bezier(.2,.8,.2,1)",
          clipPath: "polygon(0 0, 100% 0, calc(100% - 14px) 100%, 14px 100%)",
        }}
      >
        Test Environment
      </div>
    </div>
  );
}
