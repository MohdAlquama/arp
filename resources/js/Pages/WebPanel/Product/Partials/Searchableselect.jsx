import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Check } from "lucide-react";

/**
 * Reusable searchable dropdown.
 * Click the field -> panel opens with a search box on top and the options below.
 * options: [{ value, label }]
 */
export default function SearchableSelect({
    value,
    onChange,
    options = [],
    placeholder = "Select",
    searchPlaceholder = "",
    disabled = false,
    required = false,
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const wrapperRef = useRef(null);
    const searchRef = useRef(null);
    const itemRefs = useRef([]);

    const selected = options.find((o) => String(o.value) === String(value));

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
    }, [options, query]);

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // On open: reset search, focus the search box, highlight current selection
    useEffect(() => {
        if (open) {
            setQuery("");
            const idx = options.findIndex((o) => String(o.value) === String(value));
            setActive(idx >= 0 ? idx : 0);
            setTimeout(() => searchRef.current?.focus(), 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    // Keep highlighted item visible while using arrow keys
    useEffect(() => {
        if (open) itemRefs.current[active]?.scrollIntoView({ block: "nearest" });
    }, [active, open]);

    const choose = (option) => {
        onChange(option.value);
        setOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filtered[active]) choose(filtered[active]);
        } else if (e.key === "Escape" || e.key === "Tab") {
            setOpen(false);
        }
    };

    return (
        <div ref={wrapperRef} className="relative">
            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((o) => !o)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-left text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
            >
                <span className={selected ? "text-gray-900" : "text-gray-400"}>
                    {selected ? selected.label : placeholder}
                </span>
                <ChevronDown
                    size={16}
                    className={`text-gray-400 transition ${open ? "rotate-180" : ""}`}
                />
            </button>

            {/* Hidden field so native "required" validation checks the real selected value */}
            <input
                tabIndex={-1}
                required={required}
                value={value ?? ""}
                onChange={() => {}}
                className="pointer-events-none absolute bottom-0 left-0 h-0 w-full opacity-0"
            />

            {open && (
                <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                    {/* Search box */}
                    <div className="p-2">
                        <input
                            ref={searchRef}
                            type="text"
                            autoComplete="off"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setActive(0);
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder={searchPlaceholder}
                            className="w-full rounded-md border border-violet-300 bg-white px-3 py-2 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
                        />
                    </div>

                    <ul className="max-h-56 overflow-y-auto pb-1">
                        {/* Muted placeholder row (clears the selection) */}
                        {!query && (
                            <li
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    onChange("");
                                    setOpen(false);
                                }}
                                className="cursor-pointer px-3.5 py-2 text-sm text-gray-400 hover:bg-gray-50"
                            >
                                {placeholder}
                            </li>
                        )}

                        {filtered.length === 0 && (
                            <li className="px-3.5 py-2 text-sm text-gray-500">No results found</li>
                        )}

                        {filtered.map((option, index) => {
                            const isSelected = String(option.value) === String(value);
                            return (
                                <li
                                    key={option.value}
                                    ref={(el) => (itemRefs.current[index] = el)}
                                    onMouseEnter={() => setActive(index)}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        choose(option);
                                    }}
                                    className={`flex cursor-pointer items-center justify-between px-3.5 py-2 text-sm text-gray-700 ${
                                        index === active ? "bg-gray-100" : ""
                                    }`}
                                >
                                    <span>{option.label}</span>
                                    {isSelected && <Check size={16} className="text-violet-600" />}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}