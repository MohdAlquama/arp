import React, { useState, useEffect, useRef } from 'react'
import { router } from '@inertiajs/react'
import { Search, X } from 'lucide-react'

export default function SizeFilter({ filters = {}, routeName = 'admin.website.attributes.size.index' }) {
  const [search, setSearch] = useState(filters.search || '')
  const [status, setStatus] = useState(filters.status || '')
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip the initial mount so we don't fire a needless request
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const timeout = setTimeout(() => {
      const params = {}
      if (search) params.search = search
      if (status) params.status = status

      router.get(route(routeName), params, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        only: ['sizes', 'filters'],
      })
    }, 350)

    return () => clearTimeout(timeout)
  }, [search, status])

  const hasFilters = search || status

  const reset = () => {
    setSearch('')
    setStatus('')
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      {/* Search */}
      <div className="relative min-w-[200px] flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search sizes..."
          className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />
      </div>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="draft">Draft</option>
      </select>

      {/* Reset */}
      {hasFilters && (
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <X size={16} />
          <span>Clear</span>
        </button>
      )}
    </div>
  )
}