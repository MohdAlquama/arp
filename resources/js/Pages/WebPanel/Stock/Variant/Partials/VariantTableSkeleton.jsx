import React from 'react'

const columns = 9

export default function VariantTableSkeleton({ rows = 8 }) {
    return (
        <div className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3.5">
                {Array.from({ length: columns }).map((_, i) => (
                    <div key={i} className="h-3 flex-1 rounded bg-gray-200" />
                ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-100">
                {Array.from({ length: rows }).map((_, r) => (
                    <div key={r} className="flex items-center gap-4 px-4 py-4">
                        {Array.from({ length: columns }).map((_, c) => (
                            <div
                                key={c}
                                className={`h-4 flex-1 rounded bg-gray-100 ${
                                    c === columns - 2 ? 'max-w-[70px] rounded-full' : ''
                                }`}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
                <div className="h-4 w-40 rounded bg-gray-100" />
                <div className="flex gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-8 w-8 rounded-lg bg-gray-100" />
                    ))}
                </div>
            </div>
        </div>
    )
}