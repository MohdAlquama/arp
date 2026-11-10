import { useState, useMemo, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import {
  BOTTOM_MENU,
  MAIN_MENU,
  PRODUCTS,
  STOCK_AND_INVENTORY_MANAGEMENT,
} from "./sidebarConfig";

// Safe resolver: Uses Ziggy route() if available, otherwise falls back to href
const resolveHref = (item) => {
  if (item.route && typeof route === "function") {
    try {
      return route(item.route);
    } catch {
      return item.href || "#";
    }
  }
  return item.href || "#";
};

// Check if current item matches active route or current URL
const checkIsActive = (item, currentUrl) => {
  if (item.route && typeof route === "function") {
    try {
      if (route().current(item.route)) return true;
    } catch {
      // fallback to path matching
    }
  }
  const href = resolveHref(item);
  if (href === "#") return false;

  // Clean query strings and prevent partial prefix collisions
  const cleanUrl = currentUrl.split("?")[0];
  return cleanUrl === href || cleanUrl.startsWith(href + "/");
};

function SidebarItem({ item, open, isActive, onToggle, onClose }) {
  const Icon = item.icon;
  const hasChildren = Boolean(item.children && item.children.length > 0);

  const content = (
    <>
      <Icon
        size={18}
        className={`shrink-0 ${isActive ? "text-violet-700" : "text-slate-500"}`}
      />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge && (
        <span className="rounded bg-emerald-400 px-1.5 py-0.5 text-[10px] font-semibold text-white">
          {item.badge}
        </span>
      )}
      {(hasChildren || item.caret) &&
        (open ? (
          <ChevronUp size={16} className="text-violet-700" />
        ) : (
          <ChevronDown size={16} className="text-violet-700" />
        ))}
    </>
  );

  const baseClasses = `flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[14px] font-medium transition-colors ${
    isActive
      ? "bg-violet-50 text-violet-700 font-semibold"
      : "text-slate-700 hover:bg-slate-100"
  }`;

  if (hasChildren) {
    return (
      <button type="button" onClick={onToggle} className={baseClasses}>
        {content}
      </button>
    );
  }

  return (
    <Link href={resolveHref(item)} onClick={onClose} className={baseClasses}>
      {content}
    </Link>
  );
}

export default function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  const { url } = usePage();

  // FIX 1: Added "stock&Inventory" to initial openKeys
  const [openKeys, setOpenKeys] = useState([
    "summary",
    "pg-products",
    "attributes",
    "stock&Inventory",
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  // FIX 2: Added STOCK_AND_INVENTORY_MANAGEMENT to auto-open effect
  useEffect(() => {
    const activeParents = [];

    const checkSection = (items, sectionKey) => {
      items.forEach((item) => {
        if (item.children) {
          const hasActiveChild = item.children.some((child) =>
            checkIsActive(child, url)
          );
          if (hasActiveChild) {
            activeParents.push(item.key);
            if (sectionKey) activeParents.push(sectionKey);
          }
        } else if (checkIsActive(item, url) && sectionKey) {
          activeParents.push(sectionKey);
        }
      });
    };

    checkSection(MAIN_MENU, null);
    checkSection(PRODUCTS, "pg-products");
    checkSection(STOCK_AND_INVENTORY_MANAGEMENT, "stock&Inventory");
    checkSection(BOTTOM_MENU, null);

    if (activeParents.length > 0) {
      setOpenKeys((prev) => Array.from(new Set([...prev, ...activeParents])));
    }
  }, [url]);

  const toggle = (key) =>
    setOpenKeys((keys) =>
      keys.includes(key) ? keys.filter((k) => k !== key) : [...keys, key]
    );

  // Live filter for search input
  const filterList = (items) => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();

    return items
      .map((item) => {
        const matchesParent = item.label.toLowerCase().includes(term);
        const filteredChildren = item.children?.filter((c) =>
          c.label.toLowerCase().includes(term)
        );

        if (matchesParent || (filteredChildren && filteredChildren.length > 0)) {
          return {
            ...item,
            children:
              filteredChildren && filteredChildren.length > 0
                ? filteredChildren
                : item.children,
          };
        }
        return null;
      })
      .filter(Boolean);
  };

  const filteredMainMenu = useMemo(() => filterList(MAIN_MENU), [searchTerm]);
  const filteredProducts = useMemo(() => filterList(PRODUCTS), [searchTerm]);
  const filteredStock = useMemo(
    () => filterList(STOCK_AND_INVENTORY_MANAGEMENT),
    [searchTerm]
  );
  const filteredBottomMenu = useMemo(
    () => filterList(BOTTOM_MENU),
    [searchTerm]
  );

  const renderItem = (item) => {
    const open = searchTerm.trim() ? true : openKeys.includes(item.key);
    const hasChildren = Boolean(item.children && item.children.length > 0);
    const isItemActive = hasChildren
      ? item.children.some((child) => checkIsActive(child, url))
      : checkIsActive(item, url);

    return (
      <li key={item.key}>
        <SidebarItem
          item={item}
          open={open}
          isActive={isItemActive && !hasChildren}
          onToggle={() => toggle(item.key)}
          onClose={onClose}
        />

        {hasChildren && open && (
          <ul className="ml-[22px] mt-1 space-y-1 border-l-2 border-slate-200 pl-3">
            {item.children.map((child) => {
              const isChildActive = checkIsActive(child, url);

              return (
                <li key={child.key || child.label} className="relative">
                  {isChildActive && (
                    <span className="absolute -left-[14px] top-0 h-full w-[2px] bg-violet-700" />
                  )}
                  <Link
                    href={resolveHref(child)}
                    onClick={onClose}
                    className={`block w-full rounded-md px-3 py-2 text-left text-[14px] font-medium transition-colors ${
                      isChildActive
                        ? "bg-violet-50 text-violet-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  };

  const isPgOpen = searchTerm.trim() ? true : openKeys.includes("pg-products");
  // FIX 3: Created dedicated state check for Stock & Inventory section
  const isStockOpen = searchTerm.trim()
    ? true
    : openKeys.includes("stock&Inventory");

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-900/40 transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Main Sidebar Aside */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Real-time Search Box */}
        <div className="border-b border-slate-200 p-3">
          <div className="relative flex items-center">
            <Search
              size={16}
              className="pointer-events-none absolute left-2.5 text-slate-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search menu..."
              className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-7 text-[13px] text-slate-800 placeholder-slate-400 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-1 focus:ring-violet-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {/* Main Menu Items */}
          {filteredMainMenu.length > 0 && (
            <ul className="space-y-1">{filteredMainMenu.map(renderItem)}</ul>
          )}

          {/* PG Products Dropdown Section */}
          {filteredProducts.length > 0 && (
            <>
              <div className="my-3 border-t border-slate-200" />
              <button
                type="button"
                onClick={() => toggle("pg-products")}
                className="mb-2 flex w-full items-center gap-2 px-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-800"
              >
                {isPgOpen ? (
                  <ChevronUp size={14} className="text-violet-700" />
                ) : (
                  <ChevronDown size={14} className="text-violet-700" />
                )}
                PG Products
              </button>

              {isPgOpen && (
                <ul className="space-y-1">{filteredProducts.map(renderItem)}</ul>
              )}
            </>
          )}

          {/* FIX 4: Updated Stock & Inventory Section to use isStockOpen and proper label */}
          {filteredStock.length > 0 && (
            <>
              <div className="my-3 border-t border-slate-200" />
              <button
                type="button"
                onClick={() => toggle("stock&Inventory")}
                className="mb-2 flex w-full items-center gap-2 px-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-800"
              >
                {isStockOpen ? (
                  <ChevronUp size={14} className="text-violet-700" />
                ) : (
                  <ChevronDown size={14} className="text-violet-700" />
                )}
                Stock & Inventory
              </button>

              {isStockOpen && (
                <ul className="space-y-1">{filteredStock.map(renderItem)}</ul>
              )}
            </>
          )}

          {/* Bottom Menu Items */}
          {filteredBottomMenu.length > 0 && (
            <>
              <div className="my-3 border-t border-slate-200" />
              <ul className="space-y-1">{filteredBottomMenu.map(renderItem)}</ul>
            </>
          )}

          {/* Empty Search Result Message */}
          {filteredMainMenu.length === 0 &&
            filteredProducts.length === 0 &&
            filteredBottomMenu.length === 0 &&
            filteredStock.length === 0 && (
              <p className="px-3 py-8 text-center text-xs text-slate-400">
                No menu items found.
              </p>
            )}
        </div>
      </aside>
    </>
  );
}