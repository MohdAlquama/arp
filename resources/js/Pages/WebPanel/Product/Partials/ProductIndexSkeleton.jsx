import React from 'react';

export default function ProductIndexSkeleton({ rows = 8 }) {
    return (
        <div className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3.5">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-3 flex-1 rounded bg-gray-200" />
                ))}
            </div>
            {Array.from({ length: rows }).map((_, row) => (
                <div key={row} className="flex items-center gap-4 border-b border-gray-100 px-4 py-4">
                    {Array.from({ length: 6 }).map((__, column) => (
                        <div key={column} className="h-8 flex-1 rounded bg-gray-100" />
                    ))}
                </div>
            ))}
            <div className="flex justify-center gap-2 p-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="h-8 w-8 rounded bg-gray-100" />
                ))}
            </div>
        </div>
    );
}
