import React from 'react'
import { Link } from '@inertiajs/react'

// Laravel returns labels like "&laquo; Previous" / "Next &raquo;"
const cleanLabel = (label) =>
    label.replace('&laquo;', '«').replace('&raquo;', '»').replace(/&amp;/g, '&')

export default function Pagination({ meta }) {
    if (!meta || !meta.links || meta.last_page <= 1) {
        return meta?.total ? (
            <div className="border-t border-gray-200 px-4 py-3 text-sm text-gray-500">
                Showing {meta.from} to {meta.to} of {meta.total} results
            </div>
        ) : null
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-4 py-3">
            <p className="text-sm text-gray-500">
                Showing {meta.from} to {meta.to} of {meta.total} results
            </p>

            <div className="flex flex-wrap items-center gap-1">
                {meta.links.map((link, i) => {
                    const base =
                        'min-w-[2rem] rounded-lg px-3 py-1.5 text-center text-sm font-medium transition'

                    if (!link.url) {
                        return (
                            <span key={i} className={`${base} cursor-not-allowed text-gray-300`}>
                                {cleanLabel(link.label)}
                            </span>
                        )
                    }

                    return (
                        <Link
                            key={i}
                            href={link.url}
                            preserveScroll
                            preserveState
                            className={`${base} ${
                                link.active
                                    ? 'bg-violet-600 text-white shadow-sm'
                                    : 'text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {cleanLabel(link.label)}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}