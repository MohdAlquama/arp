import React from 'react'

export default function StatusBadge({ active, activeLabel = 'Active', inactiveLabel = 'Hidden' }) {
  return active ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
      {activeLabel}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
      {inactiveLabel}
    </span>
  )
}
