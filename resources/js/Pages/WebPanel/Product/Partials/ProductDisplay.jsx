import React from "react";
import { Palette, Type } from "lucide-react";

const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20";

const COLOR_MODES = [
    {
        value: "swatch",
        title: "Colour swatch",
        hint: "Round colour dot (from hex code)",
    },
    {
        value: "name",
        title: "Colour name",
        hint: "Text only, e.g. Black",
    },
    {
        value: "both",
        title: "Swatch + name",
        hint: "Colour dot with its name",
    },
];

/**
 * Small reusable renderer — use the same markup on the public website.
 */
export function ColorChip({ hex, name, mode = "both" }) {
    const showSwatch = mode === "swatch" || mode === "both";
    const showName = mode === "name" || mode === "both";

    return (
        <span
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700"
            title={hex ? `${name ?? ""} ${hex}`.trim() : name ?? ""}
        >
            {showSwatch && (
                <span
                    className="h-4 w-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: hex || "#e5e7eb" }}
                />
            )}

            {showName && <span>{name || "-"}</span>}

            {/* swatch-only mode with no hex would show nothing useful */}
            {mode === "swatch" && !hex && <span>{name || "-"}</span>}
        </span>
    );
}

export default function ProductDisplay({
    displayName,
    colorDisplay,
    variations = [],
    onNameChange,
    onColorDisplayChange,
    nameError,
    colorError,
}) {
    // unique colours only (same colour can repeat across sizes)
    const colors = [];
    const seen = new Set();

    variations.forEach((v) => {
        const key = `${v.color_id}-${v.color_name}`;
        if (!v.color_name || seen.has(key)) return;
        seen.add(key);
        colors.push(v);
    });

    return (
        <div className="space-y-6">
            {/* Display name */}
            <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Type size={15} className="text-gray-400" />
                    Name shown on website
                    <span className="text-red-500">*</span>
                </label>

                <input
                    type="text"
                    value={displayName}
                    onChange={(e) => onNameChange(e.target.value)}
                    placeholder="Product name customers will see"
                    maxLength={255}
                    required
                    className={inputClass}
                />

                {nameError && (
                    <p className="mt-1.5 text-sm text-red-600">{nameError}</p>
                )}
            </div>

            {/* Colour display mode */}
            <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Palette size={15} className="text-gray-400" />
                    How colours appear on website
                    <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {COLOR_MODES.map((mode) => {
                        const active = colorDisplay === mode.value;

                        return (
                            <button
                                key={mode.value}
                                type="button"
                                onClick={() => onColorDisplayChange(mode.value)}
                                className={`rounded-lg border p-3 text-left transition ${
                                    active
                                        ? "border-violet-600 bg-violet-50 ring-2 ring-violet-600/20"
                                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                }`}
                            >
                                <p
                                    className={`text-sm font-semibold ${
                                        active ? "text-violet-700" : "text-gray-800"
                                    }`}
                                >
                                    {mode.title}
                                </p>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    {mode.hint}
                                </p>
                            </button>
                        );
                    })}
                </div>

                {colorError && (
                    <p className="mt-1.5 text-sm text-red-600">{colorError}</p>
                )}
            </div>

            {/* Live preview */}
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Website preview
                </p>

                <h4 className="mt-2 text-base font-semibold text-gray-900">
                    {displayName || "Product name"}
                </h4>

                <div className="mt-3 flex flex-wrap gap-2">
                    {colors.length > 0 ? (
                        colors.map((c, i) => (
                            <ColorChip
                                key={`${c.color_id}-${i}`}
                                hex={c.color_hex}
                                name={c.color_name}
                                mode={colorDisplay}
                            />
                        ))
                    ) : (
                        <span className="text-xs text-gray-400">
                            Select an article to preview colours.
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
