import React from 'react'
import { Link, router } from '@inertiajs/react'
import { Edit, Trash2, Sparkles, Eye, EyeOff } from 'lucide-react'
import EmptyState from './EmptyState'
import StatusBadge from './StatusBadge'

const money = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

export default function NewArrivalsTable({ arrivals }) {
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      router.delete(route('admin.website.new-arrivals.destroy', id), { preserveScroll: true })
    }
  }

  const handleToggle = (id) => {
    router.patch(route('admin.website.new-arrivals.toggle', id), {}, { preserveScroll: true })
  }

  if (arrivals.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <EmptyState
          icon={Sparkles}
          title="No new arrivals found"
          description='Add products for the "New Arrivals" section of your home page.'
          actionHref={route('admin.website.new-arrivals.create')}
          actionLabel="Add Product"
        />
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/75 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="py-3.5 pl-6 pr-3">Image</th>
              <th className="px-3 py-3.5">Product</th>
              <th className="px-3 py-3.5">Price</th>
              <th className="px-3 py-3.5">Badge</th>
              <th className="px-3 py-3.5">Order</th>
              <th className="px-3 py-3.5">Status</th>
              <th className="py-3.5 pl-3 pr-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-sm">
            {arrivals.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-gray-50/50">
                <td className="py-4 pl-6 pr-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                </td>

                <td className="max-w-xs px-3 py-4">
                  <div className="truncate font-semibold text-gray-900">{item.name}</div>
                  <div className="mt-0.5 truncate text-xs text-gray-500">
                    {item.category_label || 'No category label.'}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-gray-400">{item.href}</div>
                </td>

                <td className="px-3 py-4">
                  <div className="font-semibold text-gray-900">{money(item.price)}</div>
                  {item.old_price && (
                    <div className="mt-0.5 flex items-center gap-2 text-xs">
                      <span className="text-gray-400 line-through">{money(item.old_price)}</span>
                      {item.discount_percent && (
                        <span className="font-medium text-emerald-600">{item.discount_percent}% off</span>
                      )}
                    </div>
                  )}
                </td>

                <td className="px-3 py-4">
                  {item.badge ? (
                    <span className="rounded-md bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-700">
                      {item.badge}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>

                <td className="px-3 py-4 text-sm font-medium text-gray-700">{item.sort_order}</td>

                <td className="px-3 py-4">
                  <StatusBadge active={item.status} />
                </td>

                <td className="py-4 pl-3 pr-6 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => handleToggle(item.id)}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-violet-600"
                      title={item.status ? 'Hide from website' : 'Show on website'}
                    >
                      {item.status ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>

                    <Link
                      href={route('admin.website.new-arrivals.edit', item.id)}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-violet-600"
                      title="Edit Product"
                    >
                      <Edit size={16} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
