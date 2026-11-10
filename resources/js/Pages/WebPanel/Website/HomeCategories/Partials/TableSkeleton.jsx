import React from 'react'

/**
 * Animated placeholder rows for admin tables while deferred data loads.
 * Usage: <Deferred data="sections" fallback={<TableSkeleton />}> ... </Deferred>
 */
export default function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
      aria-busy="true"
      aria-label="Loading"
    >
      {/* header row */}
      <div className="flex gap-6 border-b border-gray-200 bg-gray-50/75 px-6 py-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-3 flex-1 animate-pulse rounded bg-gray-200" />
        ))}
      </div>

      {/* body rows */}
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex items-center gap-6 px-6 py-4">
            <div className="h-14 w-24 shrink-0 animate-pulse rounded-lg bg-gray-200" />

            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-2/3 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
            </div>

            {Array.from({ length: Math.max(columns - 2, 1) }).map((_, c) => (
              <div key={c} className="h-5 flex-1 animate-pulse rounded-md bg-gray-100" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
