import React from 'react'
import { Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'

export default function PageHeader({ title, children }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">{children}</p>
      </div>
      <Link
        href={route('admin.website.new-arrivals.index')}
        className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <ArrowLeft size={16} />
        Back to List
      </Link>
    </div>
  )
}
