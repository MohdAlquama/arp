import React from 'react'
import { Link } from '@inertiajs/react'
import { Plus } from 'lucide-react'

export default function EmptyState({ icon: Icon, title, description, actionHref, actionLabel }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      {Icon && (
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-600">
          <Icon size={24} />
        </div>
      )}
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>
      {actionHref && (
        <Link
          href={actionHref}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500"
        >
          <Plus size={16} />
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
